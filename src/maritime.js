const http = require("http");
const middlewareCompiler = require("./middlewareCompiler.js");
const dataObj = require("./data/data.js");
const requestObj = request("./data/req.js");
const responseObj = require("./data/res.js");

module.exports = class Maritime {
  constructor() {
    this.globalMiddleware = [];
  }

  use(middleware) {
    this.globalMiddleware.push(middleware);
  }

  handleServer() {
    // function to pass to http server
    return function(req, res) {
      const data = this.constructData(req, res);
      return this.handleRequest(data, middleware);
    }
  }

  handleRequest() {
    
  }

  constructData() {

  }

  listen(...args) {
    const server = http.createServer(this.handleServer());
    return server.listen(...args);
  }
};
