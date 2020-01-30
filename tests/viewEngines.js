const assert = require("assert");
const Maritime = require("../index.js");

describe("Maritime", function() {
  describe(".renderingEngine(engine)", function() {
    it("providing the name of an invalid rendering engine should throw error", function(done) {
      assert.throws(function() {
        Maritime.renderingEngine("wrong-name");
      }, Error);

      done();
    });
  });
});
