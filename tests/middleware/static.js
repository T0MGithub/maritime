const assert = require("assert");
const Maritime = require("../../index.js");
const request = require("supertest");

describe("static()", function() {
  it("static() middleware should successfully serve static files from static folder", function(done) {
    const app = new Maritime();

    app.use(Maritime.static(__dirname + "../../fixtures"));

    request(app.listen())
      .get("/test.txt")
      .expect(200)
      .expect("Test data!", done);
  });

  it("static() middleware should serve index option for / route", function(done) {
    const app = new Maritime();

    app.use(
      Maritime.static(__dirname + "../../fixtures", {
        index: "test.txt"
      })
    );

    request(app.listen())
      .get("/")
      .expect(200)
      .expect("Test data!", done);
  });
});
