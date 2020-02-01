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
          data.res.redirect("/программирование");
        });

        request(app.listen())
          .get("/")
          .expect(
            "Location",
            "/%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5"
          )
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
