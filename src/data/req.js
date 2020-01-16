const http = require("http");

// build request object around standard HTTP server request object
var req = Object.create(http.IncomingMessage.prototype);

module.exports = req;
