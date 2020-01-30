const assert = require("assert");
const utils = require("../src/utils.js");

describe("utils", function() {
  describe(".nodeHttpVerbs()", function() {
    it("should return a list of valid http verbs", function(done) {
      const list = utils.nodeHttpVerbs();

      assert(Array.isArray(list));

      done();
    });
  });

  describe("addGetter()", function() {
    it("should add a getter function to an object", function(done) {
      let obj = {};

      utils.addGetter(obj, "test", function() {
        return true;
      });

      assert(obj.test);

      done();
    });
  });

  describe("addSetter()", function() {
    it("should add a setter function to an object", function(done) {
      let obj = {};

      utils.addSetter(obj, "test", function(val) {
        this.otherTest = val;
      });

      obj.test = "test-val";
      assert(obj.otherTest === "test-val");

      done();
    });
  });

  describe("setCharset(type, charset)", function() {
    it("should successfully format content type header with charset", function(done) {
      let header = "text/plain; charset=UTF-8"
      let updatedHeader = utils.setCharset(header, "ascii");
      
      assert(updatedHeader === "text/plain; charset=ascii");

      done();
    });

    it("shouldn't change content type header if either or both arguments missing", function(done) {
      let header = "text/plain; charset=UTF-8"
      let updatedHeader = utils.setCharset(header);
      
      assert(updatedHeader === "text/plain; charset=UTF-8");

      done();
    })
  })
});
