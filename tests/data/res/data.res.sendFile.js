const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("res", function() {
    describe(".sendFile(filePath)", function() {
      it("should successfully send file contents as body", function(done) {
        const app = new Maritime();

        app.use(data => {
          data.res.sendFile(__dirname + "../../../fixtures/test.txt");
        });

        request(app.listen())
          .get("/")
          .expect("Content-Type", "text/plain; charset=UTF-8")
          .expect(200)
          .expect("Test data!", done);
      });
    });
  });
});
