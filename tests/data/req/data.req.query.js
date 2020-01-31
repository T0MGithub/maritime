const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".query", function() {
      it("should be object of query parameters", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.req.query.test);
        });

        request(app.listen())
          .get("/?test=data")
          .expect(200)
          .expect("data", done);
      });
    });
  });
});
