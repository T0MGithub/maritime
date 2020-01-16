const http = require("http");

// build response object around standard HTTP server response object
var res = Object.create(http.ServerResponse.prototype);

res.status = function() {}

module.exports = res;
