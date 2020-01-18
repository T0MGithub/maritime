const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

/**
 * Convert wildcards in the route into path-to-regexp required syntax, "(.*)".
 * Only asteriks that represents wildcards should be converted, not ones
 * part of a route name/parameter or part of other syntax. Therefore, this
 * function only converts wildcards with the start of the string or a "/" on one
 * side and the end of the string or a "/" on the other side.
 *
 * e.g.
 *
 * '(.*)' ---> '(.*)'
 * '/test*' ---> '/test*'
 * '/*test'/ ---> '/*test'
 *
 * '/*' ---> '/(.*)'
 * '/test/*' ---> '/test/(.*)'
 * '*' ---> '(.*)'
 *
 * @param {string} path
 * @return {string} path with converted wildcards
 */

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
  if (path.indexOf("*") !== -1) path = convertWildcards(path);
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
    if (this.path.indexOf("*") !== -1) this.path = convertWildcards(this.path);

    this.parameters = [];
    this.regex = pathToRegexp(this.path, this.parameters, this.options);
  }

  return this;
};

module.exports = Route;
