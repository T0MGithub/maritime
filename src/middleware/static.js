const path = require("path");
const url = require("url");

module.exports = function(root = ".", options = {}) {
  if (options.index !== false) options.index = options.index || "index.html";
  options.root = path.resolve(root);

  return function(data, next) {
    if (data.req.method !== "GET" && data.req.method !== "HEAD") return next();
    if (data.res.finished) return next();
    console.log(url.parse(data.req.url).path)

    data.res.sendFile(url.parse(data.req.url).path, options);
  };
};
