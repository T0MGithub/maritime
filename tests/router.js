const assert = require("assert");
const Maritime = require("../index.js");
const request = require("supertest");

describe("router", function() {
  it("should successfully match routes", function(done) {
    const app = new Maritime();
    const router = new Maritime.router();

    router.get("/", function(data) {
      data.res.send("ok");
    });

    app.mount(router);

    request(app.listen())
      .get("/")
      .expect(200)
      .end(done);
  });

  describe(".absorb", function(done) {
    it("should successfully absorb routes", function(done) {
      const app = new Maritime();
      const router1 = new Maritime.router();
      const router2 = new Maritime.router();

      router1.get("/", function(data) {
        data.res.send("ok");
      });

      router2.get("/route2", function(data) {
        data.res.send("ok");
      });

      router1.absorb(router2);
      app.mount(router1);

      request(app.listen())
        .get("/route2")
        .expect(200)
        .end(done);
    });

    it("should absorb router and rebase routes", function(done) {
      const app = new Maritime();
      const router1 = new Maritime.router();
      const router2 = new Maritime.router();

      router1.get("/", function(data) {
        data.res.send("ok");
      });

      router2.get("/route2", function(data) {
        data.res.send("ok");
      });

      router1.absorb("/test", router2);
      app.mount(router1);

      request(app.listen())
        .get("/test/route2")
        .expect(200)
        .end(done);
    });
  });
});