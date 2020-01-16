const http = require("http");
const middlewareCompiler = require("./middlewareCompiler.js");
const dataObj = require("./data/data.js");
const requestObj = require("./data/req.js");
const responseObj = require("./data/res.js");
const maritimeRouter = require("./router/router.js");

module.exports = class Maritime {
  constructor() {
    this.globalMiddleware = [];
    this.mountedRouters = [];

    this.dataObj = Object.create(dataObj);
    this.requestObj = Object.create(requestObj);
    this.responseObj = Object.create(responseObj);
  }

  use(middleware) {
    this.globalMiddleware.push(middleware);
  }

  mount(...args) {
    let baseRoute, middleware, router;
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

    // check a maritime router object is provided
    if (!router instanceof maritimeRouter)
      throw new Error(
        "Only maritime routers can be mounted for use with maritime."
      );

    // apply options to router before mounting
    if (baseRoute !== undefined) router = router.rebaseRouter(baseRoute);
    if (middleware !== undefined) {
      router.use(undefined, middleware);
    }

    // mount router
    this.mountedRouters.push(router);
  }

  handleServer() {
    // function to pass to http server
    const serverFunction = function(req, res) {
      const data = this.constructData(req, res);
      return this.handleRequest(data);
    };

    // bind this object to the function so when it is ran inside the HTTP
    // server, the function can still access methods inside this object
    return serverFunction.bind(this);
  }

  findRoutes(path, method) {
    let totalMatches = [];
    let match;
    for (let i = 0; i < this.mountedRouters.length; i++) {
      match = this.mountedRouters[i].findRoute(path, method.toLowerCase());
      totalMatches = totalMatches.concat(match);
    }
    return totalMatches;
  }

  handleRequest(data) {
    // compile global middleware
    const compiledMiddleware = middlewareCompiler(this.globalMiddleware);

    // match a route
    let path = data.req.url;
    let method = data.req.method;
    const routeMatches = this.findRoutes(path, method);

    // compile router specific middleware
    if (routeMatches.length > 0) {
      let routeMiddleware = middlewareCompiler(routeMatches[0].middleware);
      return compiledMiddleware(data, routeMiddleware);
    } else {
      return compiledMiddleware(data);
    }
  }

  constructData(req, res) {
    const data = Object.create(this.dataObj);
    
    // create request and response objects
    const request = Object.setPrototypeOf(req, this.requestObj);
    const response = Object.setPrototypeOf(res, this.responseObj);

    // add objects to each other
    request.app = response.app = this;
    request.res = response;
    response.req = request;

    // add objects to data object
    data.req = request;
    data.res = response;

    return data;
  }

  listen(...args) {
    const server = http.createServer(this.handleServer());
    return server.listen(...args);
  }
};
