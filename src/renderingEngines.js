const path = require("path");
const fs = require("fs");

/**
 * Method to act as a shortcut for creating template rendering engines.
 * Returns an engine based on the parameters.
 *
 * @param {String} [engine] Name of engine to create.
 * @param {Object} [options] Options object to pass to engine object.
 * @returns {Object} Created engine object.
 */
module.exports = function(engine = "ejs", options) {
  switch (engine) {
    case "ejs":
      return new EJSRenderingEngine(options);
    case "handlebars":
      return new HandlebarsRenderingEngine(options);
    case "pug":
    case "jade":
      return new PugRenderingEngine(options);
    default:
      throw new Error(
        "Provided engine doesn't have a Maritime integrated wrapper. You can use a custom engine wrapper instead."
      );
  }
};

class EJSRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("ejs");
    } catch (error) {
      throw new Error("To use the EJS engine, EJS must be installed.");
    }

    if (options.views === undefined)
      throw new Error("options.views must be provided as an argument.");
    this.views = options.views;

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
}
module.exports.ejs = EJSRenderingEngine;

class PugRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("pug");
    } catch (error) {
      throw new Error("To use the Pug engine, Pug must be installed.");
    }

    if (options.views === undefined)
      throw new Error("options.views must be provided as an argument.");
    this.views = options.views;

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
}
module.exports.pug = module.exports.jade = PugRenderingEngine;

class HandlebarsRenderingEngine {
  constructor(options = {}) {
    try {
      this.engine = require("handlebars");
    } catch (error) {
      throw new Error(
        "To use the Handlebars engine, Handlebars must be installed."
      );
    }

    if (options.views === undefined)
      throw new Error("options.views must be provided as an argument.");
    this.views = options.views;

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
}
module.exports.handlebars = HandlebarsRenderingEngine;
