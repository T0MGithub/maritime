const http = require("http");
const url = require("url");

// build request object around standard HTTP server request object
var req = Object.create(http.IncomingMessage.prototype);

Object.defineProperty(req, "query", {
  get: function() {
    return url.parse(this.url, true).query;
  }
});

module.exports = req;
