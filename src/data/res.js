const http = require("http");
const send = require("send");
const mime = send.mime;
const utils = require("../utils");
const path = require("path");

// build response object around standard HTTP server response object
var res = Object.create(http.ServerResponse.prototype);

/**
 * Send specified file as an attachment to the client.
 *
 * @param {String} [filePath] Path to file to send as an attachment.
 * @param {String=} [altFileName] Alternative name to use as the filename of the attachment.
 * @param {Object=} [options] Options object.
 * @param {Object=} [options.headers] Object containing headers to set for response.
 */
res.download = function(filePath, altFileName, options = {}) {
  // if second argument is object, use that as the options object
  if (typeof altFileName === "object") options = altFileName;

  // require a filePath parameter to be set
  if (filePath === undefined) throw new Error("File path argument required.");

  let isAbsolutePath = path.isAbsolute(filePath);
  let staticAppValue = this.app.get("static-folder");

  // if not an absolute path and no static-folder set, throw error
  if (!isAbsolutePath && staticAppValue === undefined)
    throw new Error(
      "You must either provide a absolute path or set a static base folder using app.set('static-folder', path)."
    );

  // resolve full path with static-folder as base
  if (!isAbsolutePath) filePath = path.resolve(staticAppValue, filePath);
  // else resolve path to allow for relative arguments in path
  else filePath = path.resolve(filePath);

  // set Content-Disposition header
  const attachmentName = altFileName || path.basename(filePath);
  let headers = {
    "Content-Disposition": `attachment; filename=${attachmentName}`
  };

  if (options.headers) {
    options.headers = Object.assign(options.headers, headers);
  } else {
    options.headers = headers;
  }

  sendFile(this, this.req, filePath, options);
};

res.json = function json(obj) {
  let escape = this.app.get("json-escape");
  let replacer = this.app.get("json-replacer");
  let spaces = this.app.get("json-spaces");
  let body = JSON.stringify(obj, replacer, spaces, escape);

  // set content-type to JSON
  if (!this.get("Content-Type")) {
    this.set("Content-Type", "application/json");
  }

  return this.send(body);
};

res.send = function(body) {
  let encoding;
  let req = this.req;
  let type;

  switch (typeof body) {
    // string defaulting to html
    case "string":
      if (!this.get("Content-Type")) {
        this.type("html");
      }
      break;
    case "boolean":
    case "number":
    case "object":
      if (body === null) {
        body = "";
      } else if (Buffer.isBuffer(body)) {
        if (!this.get("Content-Type")) {
          this.type("bin");
        }
      } else {
        return this.json(body);
      }
      break;
  }

  // write strings in utf-8
  if (typeof body === "string") {
    encoding = "utf8";
    type = this.get("Content-Type");

    // reflect this in content-type
    if (typeof type === "string") {
      this.set("Content-Type", utils.setCharset(type, "UTF-8"));
    }
  }

  // populate Content-Length
  let len;
  if (body !== undefined) {
    if (Buffer.isBuffer(body)) {
      // get length of Buffer
      len = body.length;
    } else {
      // convert body to Buffer and calculate
      body = Buffer.from(body, encoding);
      encoding = undefined;
      len = body.length;
    }

    this.set("Content-Length", len);
  }

  // strip irrelevant headers
  if (204 === this.statusCode || 304 === this.statusCode) {
    this.removeHeader("Content-Type");
    this.removeHeader("Content-Length");
    this.removeHeader("Transfer-Encoding");
    body = "";
  }

  if (req.method === "HEAD") {
    // skip body for HEAD
    this.end();
  } else {
    // respond
    this.end(body, encoding);
  }

  return this;
};

res.get = function(name) {
  return this.getHeader(name);
};

res.contentType = res.type = function(type) {
  var ct = type.indexOf("/") === -1 ? mime.lookup(type) : type;
  return this.set("Content-Type", ct);
};

res.set = res.header = function(field, val) {
  if (arguments.length === 2) {
    var value = Array.isArray(val) ? val.map(String) : String(val);

    // add charset to content-type
    if (field.toLowerCase() === "content-type") {
      if (Array.isArray(value)) {
        throw new TypeError("Content-Type cannot be set to an array.");
      }
      if (!/;\s*charset\s*=/.test(value)) {
        var charset = mime.charsets.lookup(value.split(";")[0]);
        if (charset) value += "; charset=" + charset.toLowerCase();
      }
    }

    this.setHeader(field, value);
  } else {
    for (var key in field) {
      this.set(key, field[key]);
    }
  }
  return this;
};

const sendFile = function(res, req, filePath, options) {
  const fileStream = send(req, filePath, options);

  // set options.headers to res as headers
  if (options.headers) {
    fileStream.on("headers", function(fileRes) {
      let headerKeys = Object.keys(options.headers);
      for (let i = 0; i < headerKeys.length; i++) {
        fileRes.setHeader(headerKeys[i], options.headers[headerKeys[i]]);
      }
    });
  }

  fileStream.pipe(res);
};

res.sendFile = function(filePath, options = {}) {
  if (filePath === undefined) throw new Error("File path argument required.");

  let isAbsolutePath = path.isAbsolute(filePath);
  let staticAppValue = this.app.get("static-folder");

  if (!isAbsolutePath && staticAppValue === undefined)
    throw new Error(
      "You must either provide a absolute path or set a static base folder using app.set('static-folder', path)."
    );

  if (!isAbsolutePath) filePath = path.resolve(staticAppValue, filePath);
  else filePath = path.resolve(filePath);

  sendFile(this, this.req, filePath, options);
};

res.redirect = function(url, altName) {
  if (url === "back") url = this.req.get("Referrer") || altName || "/";
  this.set("Location", encodeURI(url));

  this.statusCode = 302;

  this.send("Redirecting you.");
};

res.setStatus = function(newStatus) {
  this.statusCode = newStatus;
  return this;
};

utils.addSetter(res, "status", function(newStatus) {
  this.statusCode = newStatus;
  return this;
});

utils.addGetter(res, "status", function() {
  return this.statusCode;
});

res.sendStatus = function(statusCode) {
  this.status = statusCode;
  this.type("text");
  return this.send(statusCode);
};

res.render = function(...args) {
  const engine = this.app.get("rendering-engine");
  if (engine === undefined) throw new Error("No engine added to Maritime.");

  const rendered = engine.render(...args);

  this.send(rendered);
};

module.exports = res;
