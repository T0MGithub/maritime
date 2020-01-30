const assert = require("assert");
const Maritime = require("../../index.js");
const request = require("supertest");

describe("bodyparser()", function() {
  it("should successfully parse form data", function(done) {
    const app = new Maritime();

    app.use(Maritime.bodyParser());
    app.use(function(data) {
      data.res.send(data.req.body.test);
    });

    request(app.listen())
      .post("/")
      .send({ test: "test-val" })
      .type("form")
      .expect(200)
      .expect("test-val", done);
  });

  it("should successfully parse json data", function(done) {
    const app = new Maritime();

    app.use(Maritime.bodyParser());
    app.use(function(data) {
      data.res.send(data.req.body.test);
    });

    request(app.listen())
      .post("/")
      .send({ test: "test-val" })
      .set("Content-Type", "application/json")
      .expect(200)
      .expect("test-val", done);
  });

  it("should successfully parse raw text data", function(done) {
    const app = new Maritime();

    app.use(
      Maritime.bodyParser({
        enableTypes: ["json", "form", "text"]
      })
    );
    app.use(function(data) {
      data.res.send(data.req.body);
    });

    request(app.listen())
      .post("/")
      .send("test-val")
      .set("Content-Type", "text/plain")
      .expect(200)
      .expect("test-val", done);
  });
});
