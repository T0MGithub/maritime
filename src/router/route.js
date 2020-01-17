const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const convertWildcards = function(path) {
  let char;
  for (let i = 0; i < path.length; i++) {
    char = path[i];
    if (char === "*") {
      if (
        (path[i + 1] == "/" || i === path.length - 1) &&
        (path[i - 1] == "/" || i === 0)
      ) {
        path = path.substring(0, i) + "(.*)" + path.substring(i + 1);
        i += 4;
      }
    }
  }

  return path;
};

function Route(methods, path, middleware, options) {
  this.methods = methods;
  this.path = convertWildcards(path);
  this.middleware = middleware;
  this.options = options || {};
  this.parameters = [];

  this.regex = pathToRegexp(this.path, this.parameters, this.options);
}

Route.prototype.match = function(path) {
  return this.regex.test(path);
};

Route.prototype.rebaseRoute = function(routeBase) {
  if (this.path) {
    this.path = convertWildcards(this.path);
    this.path = routeBase + this.path;
    this.parameters = [];
    this.regex = pathToRegexp(this.path, this.parameters, this.options);
  }

  return this;
};

Route.prototype.applyMiddleware = function(target, middleware) {
  if (typeof target == "string") {
    if (this.match(target))
      this.middleware = this.middleware.concat(middleware);
  } else {
    this.middleware = this.middleware.concat(middleware);
  }
};

module.exports = Route;
