const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("res", function() {
    describe(".json(data)", function() {
      it("should send data using JSON format", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.json({ test: "data" });
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "application/json; charset=UTF-8")
          .expect(200)
          .expect({ test: "data" }, done);
      });
    });
  });
});
