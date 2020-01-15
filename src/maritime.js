const http = require("http");
const middlewareCompiler = require("./middlewareCompiler.js");
const dataObj = require("./data/data.js");
const requestObj = require("./data/req.js");
const responseObj = require("./data/res.js");

module.exports = class Maritime {
  constructor() {
    this.globalMiddleware = [];

    this.dataObj = Object.create(dataObj);
    this.requestObj = Object.create(requestObj);
    this.responseObj = Object.create(responseObj);
  }

  use(middleware) {
    this.globalMiddleware.push(middleware);
  }

  handleServer() {
    // function to pass to http server
    const serverFunction = function(req, res) {
      const data = this.constructData(req, res);
      return this.handleRequest(data);
    };

    // bind this object to function so server can call methods inside this object
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

    // add request and response to main data object
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
