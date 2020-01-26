const assert = require("assert");
const Maritime = require("../index.js");
const request = require("supertest");

describe("req", function() {
  describe(".download(path)", function() {
    it("should transfer file as an attachment", function(done) {
      const app = new Maritime();

      app.use(function(data) {
        data.res.download(__dirname + "/fixtures/test.txt");
      });

      request(app.listen())
        .get("/")
        .expect("Content-Type", "text/plain; charset=utf-8")
        .expect("Content-Disposition", "attachment; filename=test.txt", done);
    });
  });
});
