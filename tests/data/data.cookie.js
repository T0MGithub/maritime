const assert = require("assert");
const Maritime = require("../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("cookies", function() {
    describe("data.cookies = newObj", function() {
      it("should set new cookies obj", function(done) {
        const app = new Maritime();
        const Cookies = require("cookies");

        app.use(function(data) {
          data.cookies.set("test", "test-data");
          data.cookies = new Cookies(data.req, data.res);

          // new cookies object shouldn't have test cookie because it has been replaced
          assert(data.cookies.get("test") === undefined);

          data.res.sendStatus(200);
        });

        request(app.listen())
          .get("/")
          .expect("Set-Cookie", "test=test-data; path=/; httponly")
          .end(done);
      });
    });

    describe(".set(name, value)", function() {
      it("should set a cookie with specified name and value", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.cookies.set("test", "test-data");
          data.res.sendStatus(200);
        });

        request(app.listen())
          .get("/")
          .expect("Set-Cookie", "test=test-data; path=/; httponly")
          .end(done);
      });

      it('should sign values with app.get("keys") value', function(done) {
        const app = new Maritime({
          keys: ["test keys"]
        });

        app.use(function(data) {
          data.cookies.set("test", "test-data", { signed: true });
          data.res.sendStatus(200);
        });

        request(app.listen())
          .get("/")
          .expect(
            "Set-Cookie",
            "test=test-data; path=/; httponly,test.sig=5UB3cV6dU6VukS0VMtHAjwOT0D8; path=/; httponly"
          )
          .end(done);
      });
    });
  });
});
