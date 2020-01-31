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

  describe(".rebaseRouter(newBase)", function() {
    it("should successfully rebase routes", function(done) {
      const app = new Maritime();
      const router = new Maritime.router();

      router.get("/val2", function(data) {
        data.res.send("ok");
      });

      router.rebaseRouter("/val1");

      app.mount(router);

      request(app.listen())
        .get("/val1/val2")
        .expect(200)
        .end(done);
    });
  });

  describe(".absorb(router)", function() {
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
  });

  describe(".absorb(newRouterBase, router)", function() {
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

  describe(".use(middleware)", function() {
    it("should apply middleware to all routes on router", function(done) {
      const app = new Maritime();
      const router = new Maritime.router();

      router.use(function(data, next) {
        return data.res.send("ok");
      });

      router.get("*", function(data) {});

      app.mount(router);

      request(app.listen())
        .get("/")
        .expect(200)
        .end(done);
    });
  });

  describe(".applyRoutingEngine(engine)", function() {
    it("should change routing engine on router", function(done) {
      const router = new Maritime.router();

      router.applyRoutingEngine(require("maritime-standard-routing"));

      const expectedEngine = require("maritime-standard-routing");
      const actualRouter = new router.routingEngine();
      assert(actualRouter instanceof expectedEngine);
      done();
    });
  });
});
