const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".ip", function() {
      it("should save parsed IP", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          // data.req.ip will be saved so it doesn't have to be recalculated
          data.req.ip;

          data.res.send(data.req.ip);
        });

        request(app.listen())
          .get("/")
          .expect(200)
          .expect("::ffff:127.0.0.1", done);
      });

      describe("when proxy enabled", function() {
        it("should return first IP in X-Forwarded-For", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(function(data) {
            data.res.send(data.req.ip);
          });

          request(app.listen())
            .get("/")
            .set("X-Forwarded-For", "127.0.0.1")
            .expect(200)
            .expect("127.0.0.1", done);
        });
      });

      describe("when proxy not enabled", function() {
        it("should return client's IP", function(done) {
          const app = new Maritime();

          app.use(function(data) {
            data.res.send(data.req.ip);
          });

          request(app.listen())
            .get("/")
            .expect(200)
            .expect("::ffff:127.0.0.1", done);
        });
      });
    });
  });
});
