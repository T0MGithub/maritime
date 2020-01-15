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

  handleRequest(data) {
    // compile main middleware
    const compiledMiddleware = middlewareCompiler(this.globalMiddleware);

    return compiledMiddleware(data);
  }

  constructData(req, res) {
    // construct data objects
    const data = Object.create(this.dataObj);
    const request = Object.create(this.requestObj);
    const response = Object.create(this.responseObj);

    // add request and response objects to main data object
    data.req = request;
    data.res = response;

    // add raw request data to constructed data
    data.req.request = req;
    data.res.response = res;

    return data;
  }

  listen(...args) {
    const server = http.createServer(this.handleServer());
    return server.listen(...args);
  }
};
