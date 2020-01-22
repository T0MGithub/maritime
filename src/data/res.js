const http = require("http");
const send = require("send");
const mime = send.mime;
const utils = require("../utils");
const path = require("path");

// build response object around standard HTTP server response object
var res = Object.create(http.ServerResponse.prototype);

res.json = function json(obj) {
  let escape = this.app.get("json escape");
  let replacer = this.app.get("json replacer");
  let spaces = this.app.get("json spaces");
  let body = JSON.stringify(obj, replacer, spaces, escape);

  // set content-type to JSON
  if (!this.get("Content-Type")) {
    this.set("Content-Type", "application/json");
  }

  return this.send(body);
};

res.send = function(body = "") {
  let chunk = body;
  let encoding;
  let req = this.req;
  let type;

  switch (typeof chunk) {
    // string defaulting to html
    case "string":
      if (!this.get("Content-Type")) {
        this.type("html");
      }
      break;
    case "boolean":
    case "number":
    case "object":
      if (chunk === null) {
        chunk = "";
      } else if (Buffer.isBuffer(chunk)) {
        if (!this.get("Content-Type")) {
          this.type("bin");
        }
      } else {
        return this.json(chunk);
      }
      break;
  }

  // write strings in utf-8
  if (typeof chunk === "string") {
    encoding = "utf8";
    type = this.get("Content-Type");

    // reflect this in content-type
    if (typeof type === "string") {
      this.set("Content-Type", utils.setCharset(type, "utf-8"));
    }
  }

  // populate Content-Length
  let len;
  if (chunk !== undefined) {
    if (Buffer.isBuffer(chunk)) {
      // get length of Buffer
      len = chunk.length;
    } else {
      // convert chunk to Buffer and calculate
      chunk = Buffer.from(chunk, encoding);
      encoding = undefined;
      len = chunk.length;
    }

    this.set("Content-Length", len);
  }

  // strip irrelevant headers
  if (204 === this.statusCode || 304 === this.statusCode) {
    this.removeHeader("Content-Type");
    this.removeHeader("Content-Length");
    this.removeHeader("Transfer-Encoding");
    chunk = "";
  }

  if (req.method === "HEAD") {
    // skip body for HEAD
    this.end();
  } else {
    // respond
    this.end(chunk, encoding);
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

res.sendFile = function(filePath, options = {}) {
  if (filePath === undefined) throw new Error("File path argument required.");

  send(this.req, filePath, options).pipe(this);
};

res.redirect = function(url, altName) {
  if (url === "back") url = this.get("Referrer") || altName || "/";
  this.set("Location", encodeURI(url));

  this.statusCode = 302;

  this.send("Redirecting you.");
};

res.status = function(statusCode) {
  this.statusCode = statusCode;
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
  this.status(statusCode);
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
