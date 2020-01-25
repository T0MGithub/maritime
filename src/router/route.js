const Standardengine = require("maritime-standard-routing");

function Route(methods, path, middleware, options) {
  this.methods = methods;
  this.path = path;
  this.middleware = middleware;
  this.options = options || {};
  let Engine = this.options.engine || Standardengine;
  this.engine = new Engine();
}

Route.prototype.match = function(path) {
  const match = this.engine.match(path);

  if (match === false) {
    this.params = undefined;
    return false;
  } else {
    // create parameters
    this.params = this.engine.createParams(path);

    return true;
  }
};

Route.prototype.createRegex = function(path) {
  if (!path) path = this.path;
  this.engine.createRegex(path);
};

Route.prototype.rebaseRoute = function(routeBase) {
  if (this.path) {
    this.path = routeBase + this.path;
  }

  return this;
};

module.exports = Route;
