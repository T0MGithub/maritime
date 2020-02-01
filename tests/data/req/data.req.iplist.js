const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".iplist", function() {
      describe("when proxy enabled", function() {
        it("should parse X-Forwarded-For header", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(function(data) {
            data.res.send(data.req.iplist);
          });

          request(app.listen())
            .get("/")
            .set("X-Forwarded-For", '127.0.0.1')
            .expect(200)
            .expect(["127.0.0.1"], done);
        });

        it("should default to empty list", function(done) {
          const app = new Maritime({
            proxy: true
          });

          app.use(function(data) {
            data.res.send(data.req.iplist);
          });

          request(app.listen())
            .get("/")
            .expect(200)
            .expect([], done);
        });
      });

      describe("when proxy enabled", function() { 
        it("should ignore X-Forwarded-For header", function(done) {
          const app = new Maritime();

          app.use(function(data) {
            data.res.send(data.req.iplist);
          });

          request(app.listen())
            .get("/")
            .set("X-Forwarded-For", '127.0.0.1')
            .expect(200)
            .expect([], done);
        })
      });
    });
  });
});
