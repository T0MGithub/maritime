const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("res", function() {
    describe(".send(data)", function() {
      it("should handle sending undefined data", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send();
        });

        request(app.listen())
          .get("/")
          .expect(200)
          .expect("", done);
      })

      it("if JSON sent, should send data as JSON", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send({ test: "data" });
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "application/json; charset=UTF-8")
          .expect(200)
          .expect({ test: "data" }, done);
      });

      it("if text sent, should send data as text", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send("test");
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "text/html; charset=UTF-8")
          .expect(200)
          .expect("test", done);
      });
    });
  });
});
