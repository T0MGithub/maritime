const path = require("path");
const fs = require("fs");

module.exports.ejs = class EJSRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("ejs");
    } catch {
      throw new Error("To use the EJS engine, EJS must be installed.");
    }

    this.views = options.views || __dirname;

    this.globalRenderOptions = {};
    this.globalRenderOptions.cache = options.cache || false;
  }

  render(templatePath, renderData = {}, renderOptions = {}) {
    if (typeof templatePath !== "string")
      throw new Error("Path must be a string.");

    let fullPath = path.resolve(this.views, templatePath);

    if (renderOptions.async === true)
      throw new Error("Async rendering not supported.");

    // setup options object, with specific render options taking
    // priority in the Object.assign merge (passed second)
    renderOptions = Object.assign(this.globalRenderOptions, renderOptions);

    let toReturn;
    const renderCallback = function(err, rendered) {
      if (err) throw new Error(`Error rendering template. ${err}`);
      toReturn = rendered;
    };
    this.engine.renderFile(fullPath, renderData, renderOptions, renderCallback);

    return toReturn;
  }
};

module.exports.pug = class PugRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("pug");
    } catch {
      throw new Error("To use the Pug engine, Pug must be installed.");
    }

    this.views = options.views || __dirname;

    this.globalRenderOptions = {};
  }

  render(templatePath, renderData = {}, renderOptions = {}) {
    if (typeof templatePath !== "string")
      throw new Error("Path must be a string.");

    let fullPath = path.resolve(this.views, templatePath);

    // setup options object, with specific render options taking
    // priority in the Object.assign merge (passed second)
    let options = Object.assign(this.globalRenderOptions, renderOptions);

    const compiledFunction = this.engine.compileFile(fullPath, options);
    return compiledFunction(renderData);
  }
};

module.exports.handlebars = class HandlebarsRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("handlebars");
    } catch {
      throw new Error(
        "To use the Handlebars engine, Handlebars must be installed."
      );
    }

    this.views = options.views || __dirname;

    this.globalRenderOptions = {};
  }

  render(templatePath, renderData = {}, renderOptions = {}) {
    // resolve full path
    let fullPath = path.resolve(this.views, templatePath);
    
    // load template data
    const template = fs.readFileSync(fullPath, "utf8");

    const compiled = this.engine.compile(template);
    return compiled(renderData);
  }
};
