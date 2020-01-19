const utils = require("../utils.js");

const standardMethods = utils.nodeHttpVerbs().map(verb => verb.toUpperCase());

module.exports = function(options = {}) {
  let methodName = options.methodName || "_method";
  let overrideHeaderName = options.overrideHeaderName || "X-Override-Header";
  let standardMethodsOnly = options.standardMethodsOnly || true;
  let methodsToOverride = options.methodsToOverride || ["POST"];

  return function(data, next) {
    if (!methodsToOverride.includes(data.req.method)) return next();

    let newMethod;
    if (data.req.query && data.req.query[methodName])
      newMethod = data.req.query[methodName];
    if (data.req.body && data.req.body[methodName])
      newMethod = data.req.body[methodName];
    if (data.req.get(overrideHeaderName))
      newMethod = data.req.get(overrideHeaderName);

    if (newMethod) {
      newMethod = newMethod.toUpperCase();
      if (standardMethodsOnly && !standardMethods.includes(newMethod)) {
        throw new Error(
          "Non-standard method used with methodOverride. You can allow this with options.standardMethodsOnly = false."
        );
      }

      data.req.method = newMethod;
    }

    next();
  };
};
