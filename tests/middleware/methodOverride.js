const assert = require("assert");
const Maritime = require("../../index.js");
const request = require("supertest");

describe("methodOverride()", function() {
  it("method-override successfully overwrites method due to query string", function(done) {
    const app = new Maritime();
    const router = new Maritime.router();

    app.use(Maritime.methodOverride());

    router.get("/", function(data) {
      data.res.send("val1");
    });

    router.post("/", function(data) {
      data.res.send("val2");
    });

    app.mount(router);

    request(app.listen())
      .post("/?_method=GET")
      .expect(200)
      .expect("val1", done);
  });

  it("method-override successfully overwrites method due to header", function(done) {
    const app = new Maritime();
    const router = new Maritime.router();

    app.use(Maritime.methodOverride());

    router.get("/", function(data) {
      data.res.send("val1");
    });

    router.post("/", function(data) {
      data.res.send("val2");
    });

    app.mount(router);

    request(app.listen())
      .post("/")
      .set("X-Override-Header", "GET")
      .expect(200)
      .expect("val1", done);
  });

  it("method-override successfully overwrites due to form data", function(done) {
    const app = new Maritime();
    const router = new Maritime.router();

    app.use(Maritime.bodyParser());
    app.use(Maritime.methodOverride());

    router.get("/", function(data) {
      data.res.send("val1");
    });

    router.post("/", function(data) {
      data.res.send("val2");
    });

    app.mount(router);

    request(app.listen())
      .post("/")
      .send({
        _method: "GET"
      })
      .expect(200)
      .expect("val1", done);
  });
});
