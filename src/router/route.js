const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

/**
 * Convert wildcards in the route into path-to-regexp required syntax, "(.*)".
 *
 * @param {string} path
 * @return {string} path with converted wildcards
 */

const convertWildcards = function(path) {
  return path.replace("*", "(.*)");
};

function Route(methods, path, middleware, options) {
  this.methods = methods;
  if (typeof path === "string" && typeof path === "string")
    path = convertWildcards(path);
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
    if (typeof path === "string" && this.path.indexOf("*") !== -1)
      this.path = convertWildcards(this.path);

    this.parameters = [];
    this.regex = pathToRegexp(this.path, this.parameters, this.options);
  }

  return this;
};

Route.prototype.matchParameters = function(url) {
  const matchParameters = match(this.path, { decode: decodeURIComponent });
  if (matchParameters === false) return {};
  return matchParameters(url).params;
};

module.exports = Route;
