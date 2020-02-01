const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".protocol", function() {
      describe("when using secure connection", function() {
        it("should return HTTPS as protocol", function(done) {
          const app = new Maritime();

          // simulate secure connection
          app.use(function(data, next) {
            data.req.socket.encrypted = true;
            next();
          });

          app.use(function(data) {
            data.res.send(data.req.protocol);
          });

          request(app.listen())
            .get("/")
            .expect(200)
            .expect("https", done);
        });
      });

      describe("when using non-secure connection", function() {
        it("should return HTTP as protocol", function(done) {
          const app = new Maritime();

          app.use(function(data) {
            data.res.send(data.req.protocol);
          });

          request(app.listen())
            .get("/")
            .expect(200)
            .expect("http", done);
        });
      });

      describe("when proxy enabled", function() {
        it("should use X-Forwarded-Proto for the protocol", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(function(data) {
            data.res.send(data.req.protocol);
          });

          request(app.listen())
            .get("/")
            .set("X-Forwarded-Proto", "https, http")
            .expect(200)
            .expect("https", done);
        });

        it("should fallback on HTTP if no X-Forwarded-Proto set", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(function(data) {
            data.res.send(data.req.protocol);
          });

          request(app.listen())
            .get("/")
            .expect(200)
            .expect("http", done);
        });
      });

      describe("when proxy not enabled", function() {
        it("should ignore X-Forwarded-Proto header", function(done) {
          const app = new Maritime();

          app.use(function(data) {
            data.res.send(data.req.protocol);
          });

          request(app.listen())
            .get("/")
            .set("X-Forwarded-Proto", "https")
            .expect(200)
            .expect("http", done);
        });
      });
    });
  });
});
