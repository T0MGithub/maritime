const http = require("http");

module.exports = class Maritime {
  constructor() {
    this.globalMiddleware = [];
  }

  handleRequest() {
    
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest());
    return server.listen(...args);
  }
};
