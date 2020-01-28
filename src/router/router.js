const Route = require("./route.js");
const methods = require("../utils.js").nodeHttpVerbs();

function Router(options) {
  this.options = options || {};
  this.routes = [];
  this.middleware = [];
  this.routingEngine = this.options.engine;
}

// add function to create route for each standard HTTP verb
for (let i = 0; i < methods.length; i++) {
  let method = methods[i];
  Router.prototype[method] = function(path, ...middleware) {
    let options = {
      engine: this.routingEngine
    };
    this.addRoute([method], path, middleware, options);
    return this;
  };
}

Router.prototype.addRoute = function(path, methods, middleware, options) {
  // if multiple paths provided, run this function on each path
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i++) {
      this.addRoute.call(this, path[i], methods, middleware, options);
    }
    return this;
  }

  let newRoute = new Route(path, methods, middleware, options);

  this.routes.push(newRoute);

  return newRoute;
};

Router.prototype.rebaseRouter = function(routeBase) {
  for (let i = 0; i < this.routes.length; i++) {
    this.routes[i].rebaseRoute(routeBase);
  }

  return this;
};

Router.prototype.use = function(...newMiddleware) {
  this.middleware = this.middleware.concat(newMiddleware);

  return this;
};

Router.prototype.applyRoutingEngine = function(Engine) {
  this.routingEngine = Engine;
  for (let i = 0; i < this.routes.length; i++) {
    // if routing engine provided as argument to router,
    // don't overwrite that routing engine
    if (this.routes[i].options.engine === undefined) {
      this.routes[i].engine = new Engine();
      this.routes[i].createRegex();
    }
  }
};

Router.prototype.findRoute = function(path, method) {
  let routes = this.routes;

  let route, match, methodMatch, methodIncluded;
  for (let i = 0; i < routes.length; i++) {
    route = routes[i];

    methodMatch = route.methods === method;
    methodIncluded =
      Array.isArray(route.methods) && route.methods.includes(method);
    if (methodMatch || methodIncluded) {
      match = route.match(path);

      if (match) {
        return route;
      }
    }
  }
};

Router.prototype.createRegex = function() {
  for (let i = 0; i < this.routes.length; i++) {
    this.routes[i].createRegex();
  }
};

Router.prototype.absorbRouter = Router.prototype.absorb = function(...args) {
  var baseRoute, middleware, router;
  // if first argument is a string, a route should be applied to absorbed router
  if (typeof args[0] == "string") {
    baseRoute = args[0];

    // if first is base route, and the second argument is function,
    // the second argument to second to last is all middleware
    if (typeof args[1] == "function")
      middleware = args.slice(1, args.length - 2);
    router = args[args.length - 1];
  }

  // if first argument is function, all but last argument is middleware
  else if (typeof args[0] == "function") {
    middleware = args.slice(0, args.length - 2);
    router = args[args.length - 1];
  }

  // else, just a router was provided
  else {
    router = args[0];
  }

  if (!(router instanceof Router))
    throw new Error("You can only absorb other maritime routers.");

  // if new base route provided, rebase the router we are absorbing
  if (baseRoute !== undefined) router = router.rebaseRouter(baseRoute);

  // add all routes of passed router into current router
  let routesToAbsorb = router.routes;
  for (let i = 0; i < routesToAbsorb.length; i++) {
    let route = routesToAbsorb[i];

    // if middleware provided, add that middleware to each route being absorbed
    if (typeof middleware !== undefined || middleware.length !== 0) {
      route.middleware = route.middleware.concat(middleware);
    }

    this.routes.push(route);
  }

  return this;
};

module.exports = Router;
