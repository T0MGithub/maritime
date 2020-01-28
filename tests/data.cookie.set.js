const assert = require("assert");
const Maritime = require("../index.js");
const request = require("supertest");

describe("data", function() {
  describe("cookies", function() {
    describe(".set(name, value)", function() {
      it("should set a cookie with specified name and value", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.cookies.set("test", "test-data");
          data.res.sendStatus(200);
        });

        request(app.listen())
          .get("/")
          .expect("Set-Cookie", "test=test-data").end(done)
      });
    });
  });
});
