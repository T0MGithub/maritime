const assert = require("assert");
const Maritime = require("../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".download(path)", function() {
      it("should transfer file as an attachment", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.download(__dirname + "/fixtures/test.txt");
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "text/plain; charset=UTF-8")
          .expect("Content-Disposition", "attachment; filename=test.txt", done);
      });
    });

    describe(".download(path, altName)", function() {
      it("should transfer attachment with alt name", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.download(__dirname + "/fixtures/test.txt", "test2.txt");
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "text/plain; charset=UTF-8")
          .expect(
            "Content-Disposition",
            "attachment; filename=test2.txt",
            done
          );
      });
    });
  });
});
