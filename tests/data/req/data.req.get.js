const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".get(header)", function() {
      it("should get relevant header", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.req.get("Host"));
        });

        request(app.listen())
          .get("/")
          .set("Host", "example.com")
          .expect("example.com")
          .end(done);
      });

      it("if referer header requested, referrer or referer should be returned", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.req.get("referer"));
        });

        request(app.listen())
          .get("/")
          .set("referrer", "example.com")
          .expect("example.com")
          .end(done);
      });

      it("if referrer header requested, referrer or referer should be returned", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.req.get("referrer"));
        });

        request(app.listen())
          .get("/")
          .set("referer", "example.com")
          .expect("example.com")
          .end(done);
      });
    });
  });
});
