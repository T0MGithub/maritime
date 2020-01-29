const assert = require("assert");
const Maritime = require("../index.js");
const request = require("supertest");

const installed = function(moduleName) {
  try {
    require(moduleName);
    return true;
  } catch (err) {
    return false;
  }
};

describe("data", function() {
  describe("res", function() {
    describe(".render(templatePath)", function() {
      (installed("pug") ? it : it.skip)(
        "should render Pug template using Pug engine",
        function(done) {
          const app = new Maritime();

          const engine = Maritime.renderingEngine("pug", {
            views: __dirname
          });
          app.set("rendering-engine", engine);

          app.use(function(data) {
            data.res.render("./fixtures/pugTemplate.pug", {
              name: "Tom"
            });
          });

          request(app.listen())
            .get("/")
            .expect("Content-Type", "text/html; charset=UTF-8")
            .expect(200)
            .expect("<p>Tom's Pug template!</p>", done);
        }
      );

      (installed("ejs") ? it : it.skip)(
        "should render EJS template using EJS engine",
        function(done) {
          const app = new Maritime();

          const engine = Maritime.renderingEngine("ejs", {
            views: __dirname
          });
          app.set("rendering-engine", engine);

          app.use(function(data) {
            data.res.render("./fixtures/ejsTemplate.ejs", {
              name: "Tom"
            });
          });

          request(app.listen())
            .get("/")
            .expect("Content-Type", "text/html; charset=UTF-8")
            .expect(200)
            .expect("<p>Tom's EJS template!</p>", done);
        }
      );

      (installed("handlebars") ? it : it.skip)(
        "should render Handlebars template using Handlebars engine",
        function(done) {
          const app = new Maritime();

          const engine = Maritime.renderingEngine("handlebars", {
            views: __dirname
          });
          app.set("rendering-engine", engine);

          app.use(function(data) {
            data.res.render("./fixtures/hbsTemplate.hbs", {
              name: "Tom"
            });
          });

          request(app.listen())
            .get("/")
            .expect("Content-Type", "text/html; charset=UTF-8")
            .expect(200)
            .expect("<p>Tom's Handlebars template!</p>", done);
        }
      );
    });
  });
});
