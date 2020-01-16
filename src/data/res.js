const http = require("http");
const send = require("send");
const mime = send.mime;
const utils = require("../utils");

// build response object around standard HTTP server response object
var res = Object.create(http.ServerResponse.prototype);

res.send = function(body) {
  var chunk = body;
  var encoding;
  var req = this.req;
  var type;

  // settings
  var app = this.app;

  // allow status / body
  if (arguments.length === 2) {
    // res.send(body, status) backwards compat
    if (typeof arguments[0] !== "number" && typeof arguments[1] === "number") {
      deprecate(
        "res.send(body, status): Use res.status(status).send(body) instead"
      );
      this.statusCode = arguments[1];
    } else {
      deprecate(
        "res.send(status, body): Use res.status(status).send(body) instead"
      );
      this.statusCode = arguments[0];
      chunk = arguments[1];
    }
  }

  // disambiguate res.send(status) and res.send(status, num)
  if (typeof chunk === "number" && arguments.length === 1) {
    // res.send(status) will set status message as text string
    if (!this.get("Content-Type")) {
      this.type("txt");
    }

    deprecate("res.send(status): Use res.sendStatus(status) instead");
    this.statusCode = chunk;
    chunk = statuses[chunk];
  }

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

  // determine if ETag should be generated
  var generateETag = !this.get("ETag") && typeof etagFn === "function";

  // populate Content-Length
  var len;
  if (chunk !== undefined) {
    if (Buffer.isBuffer(chunk)) {
      // get length of Buffer
      len = chunk.length;
    } else if (!generateETag && chunk.length < 1000) {
      // just calculate length when no ETag + small chunk
      len = Buffer.byteLength(chunk, encoding);
    } else {
      // convert chunk to Buffer and calculate
      chunk = Buffer.from(chunk, encoding);
      encoding = undefined;
      len = chunk.length;
    }

    this.set("Content-Length", len);
  }

  // populate ETag
  var etag;
  if (generateETag && len !== undefined) {
    if ((etag = etagFn(chunk, encoding))) {
      this.set("ETag", etag);
    }
  }

  // freshness
  if (req.fresh) this.statusCode = 304;

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

res.contentType = res.type = function contentType(type) {
  var ct = type.indexOf("/") === -1 ? mime.lookup(type) : type;

  return this.set("Content-Type", ct);
};

res.set = res.header = function header(field, val) {
  if (arguments.length === 2) {
    var value = Array.isArray(val) ? val.map(String) : String(val);

    // add charset to content-type
    if (field.toLowerCase() === "content-type") {
      if (Array.isArray(value)) {
        throw new TypeError("Content-Type cannot be set to an Array");
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

module.exports = res;
