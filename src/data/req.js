const http = require("http");
const url = require("url");
const utils = require("../utils.js");

// build request object around standard HTTP server request object
var req = Object.create(http.IncomingMessage.prototype);

req.get = req.header = function header(name) {
  name = name.toLowerCase();
  switch (name) {
    case "referer":
    case "referrer":
      return this.headers.referrer || this.headers.referer;
    default:
      return this.headers[name];
  }
};

utils.addGetter(req, "query", function() {
  return url.parse(this.url, true).query;
});

utils.addGetter(req, "host", function() {
  let host = this.app.proxy && this.get("X-Forwarded-Host");
  if (!host) {
    if (this.httpVersionMajor >= 2) host = this.get(":authority");
    if (!host) host = this.get("Host");
  }
  if (!host) return "";
  return host.split(/\s*,\s*/, 1)[0];
});

utils.addGetter(req, "secure", function() {
  return this.protocol === "https";
});

utils.addGetter(req, "protocol", function() {
  if (this.socket.encrypted) return "https";
  if (!this.app.proxy) return "http";
  const proxyProtocol = this.get("X-Forwarded-Proto");
  return proxyProtocol ? proxyProtocol.split(/\s*,\s*/, 1)[0] : "http";
});

utils.addGetter(req, "iplist", function() {
  const proxyList = this.get(this.app.proxyHeader);
  return this.app.proxy && proxyList ? proxyList.split(/\s*,\s*/) : [];
});

utils.addGetter(req, "ip", function() {
  if (!this.clientIP)
    this.clientIP = this.iplist[0] || this.socket.remoteAddress || "";
  return this.clientIP;
});

module.exports = req;
