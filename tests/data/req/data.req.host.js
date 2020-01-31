const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".host", function() {
      it("should return host value if present", function(done) {
        const app = new Maritime();

        app.use(data => {
          data.res.send(data.req.host);
        });

        request(app.listen())
          .get("/")
          .set("Host", "example.com")
          .expect("example.com", done);
      });

      describe("when proxy enabled", function(done) {
        it("should use X-Forwarded-Host header for host", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(data => {
            data.res.send(data.req.host);
          });

          request(app.listen())
            .get("/")
            .set("Host", "example.com")
            .set("X-Forwarded-Host", "localhost")
            .expect("localhost", done);
        });
      });

      describe("when proxy not enabled", function(done) {
        it("should ignore X-Forwarded-Host header for host", function(done) {
          const app = new Maritime();

          app.use(data => {
            data.res.send(data.req.host);
          });

          request(app.listen())
            .get("/")
            .set("Host", "example.com")
            .set("X-Forwarded-Host", "localhost")
            .expect("example.com", done);
        });
      });

      describe("when using HTTP/2", function() {
        it("should return :authority as host", function(done) {
          const app = new Maritime();

          // simulate HTTP/2 request
          app.use((data, next) => {
            data.req.httpVersionMajor = 2;
            data.req.headers[":authority"] = "example.com";
            next();
          });

          app.use(data => {
            data.res.send(data.req.host);
          });

          request(app.listen())
            .get("/")
            .set("Host", "localhost")
            .expect("example.com", done);
        });

        it("should fallback on host header for host", function(done) {
          const app = new Maritime();

          // simulate HTTP/2 request
          app.use((data, next) => {
            data.req.httpVersionMajor = 2;
            next();
          });

          app.use(data => {
            data.res.send(data.req.host);
          });

          request(app.listen())
            .get("/")
            .set("Host", "localhost")
            .expect("localhost", done);
        });
      });

      describe("when not using HTTP/2", function() {
        it("shouldn't use :authority header for host", function(done) {
          const app = new Maritime();

          app.use((data, next) => {
            data.req.headers[":authority"] = "example.com";
            next();
          });

          app.use(data => {
            data.res.send(data.req.host);
          });

          request(app.listen())
            .get("/")
            .set("Host", "localhost")
            .expect("localhost", done);
        });
      });
    });
  });
});
