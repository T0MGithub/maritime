const standardEngine = require("maritime-standard-routing");

function Route(methods, path, middleware, options) {
  this.methods = methods;
  this.path = path;
  this.middleware = middleware;
  this.options = options || {};
  this.keys = [];
  this.engine = this.options.engine || standardEngine;

  this.createRegex();
}

Route.prototype.match = function(path) {
  const match = this.regex.exec(path);

  if (!match) {
    this.params = undefined;
    return false;
  }

  // store values
  this.params = this.engine.createParams(match, this.keys);

  return true;
};

Route.prototype.createRegex = function(path) {
  if (!path) path = this.path;
  let { regex, keys } = this.engine.toRegex(this.path, [], this.options);
  this.regex = regex;
  this.keys = keys;
};

Route.prototype.rebaseRoute = function(routeBase) {
  if (this.path) {
    this.path = routeBase + this.path;
    this.regex = this.createRegex();
  }

  return this;
};

module.exports = Route;
