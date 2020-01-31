const path = require("path");
const url = require("url");
const send = require("send");

/**
 * Function to create a middleware with provided options
 * to add static-serve functionality.
 *
 * @param {String} [root='.'] Base path for files to be served from.
 * @param {Object} [options] Options object.
 * @param {String} [options.index='index.html'] File to serve for '/' (index) route.
 * @return {Function} Middleware to serve static files.
 */
module.exports = function(root = ".", options = {}) {
  if (options.index !== false) options.index = options.index || "index.html";
  options.root = path.resolve(root);

  return function(data, next) {
    if (data.req.method !== "GET" && data.req.method !== "HEAD") return;
    if (data.res.finished) return;

    let path = url.parse(data.req.url).pathname;

    let fileStream = send(data.req, path, options);

    // if file not found
    fileStream.on("error", function error(err) {
      next();
    });

    fileStream.pipe(data.res);
  };
};
