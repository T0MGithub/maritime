const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

function Route(methods, path, middleware, options) {
  this.methods = methods;
  this.path = path;
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
    this.path = routeBase + this.path;
    this.parameters = [];
    this.regex = pathToRegexp(this.path, this.parameters, this.options);
  }

  return this;
};

Route.prototype.applyMiddleware = function(target, middleware) {
  if (typeof target == "string") {
    if (this.match(target)) this.middleware = this.middleware.concat(middleware);
  } else {
    this.middleware = this.middleware.concat(middleware);
  }
};

module.exports = Route;
