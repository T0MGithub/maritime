const http = require("http");
const url = require("url");
const utils = require("../utils.js");

// build request object around standard HTTP server request object
var req = Object.create(http.IncomingMessage.prototype);

utils.addGetter(req, "query", function() {
  return url.parse(this.url, true).query;
});

utils.addGetter(req, "secure", function() {
  return req.protocol === 'https';
});

module.exports = req;
