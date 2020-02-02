const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("res", function() {
    describe(".status", function() {
      it("should return status code", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.res.status);
        });

        request(app.listen())
          .get("/")
          .expect("200", done);
      });
    });
  });
});
