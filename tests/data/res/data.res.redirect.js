const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("res", function() {
    describe(".redirect(path)", function() {
      it("should redirect client", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.redirect("/two");
        });

        request(app.listen())
          .get("/")
          .expect("Location", "/two")
          .expect(302, done);
      });

      it("should encode URL path provided", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.redirect("/любовь");
        });

        request(app.listen())
          .get("/")
          .expect("Location", "/%D0%BB%D1%8E%D0%B1%D0%BE%D0%B2%D1%8C")
          .expect(302, done);
      });
    });

    describe('.redirect("back")', function() {
      it("should redirect client back to value of referer header", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.redirect("back");
        });

        request(app.listen())
          .get("/")
          .set("Referrer", "/two")
          .expect("Location", "/two")
          .expect(302, done);
      });

      it('should default to redirecting to "/" if no referer header and no altname', function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.redirect("back");
        });

        request(app.listen())
          .get("/")
          .expect("Location", "/")
          .expect(302, done);
      });

      it("if altname provided it should be used as fallback if no referer header", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.redirect("back", "/two");
        });

        request(app.listen())
          .get("/")
          .expect("Location", "/two")
          .expect(302, done);
      });
    });
  });
});
