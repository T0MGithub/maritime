const assert = require("assert");
const Maritime = require("../../../index.js");
const request = require("supertest");

describe("data", function() {
  describe("req", function() {
    describe(".secure", function() {
      it("should return true if using HTTPS connection", function(done) {
        const app = new Maritime();

        // simulate secure connection
        app.use(function(data, next) {
          data.req.socket.encrypted = true;
          next();
        });

        app.use(function(data) {
          data.res.send(data.req.secure);
        });

        request(app.listen())
          .get("/")
          .expect(200)
          .expect("true", done);
      });

      it("should return false if not using HTTPS connection", function(done) {
        const app = new Maritime();

        app.use(function(data) {
          data.res.send(data.req.secure);
        });

        request(app.listen())
          .get("/")
          .expect(200)
          .expect("false", done);
      });
    });
  });
});
