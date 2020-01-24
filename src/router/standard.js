const pathToRegexp = require("path-to-regexp");

module.exports.toRegex = function(path, keys, options) {
  let regex = pathToRegexp(path, keys, options);
  return {
    regex,
    keys
  };
};

module.exports.createParams = function(match, keys) {
  params = {};

  for (let i = 1; i < match.length; i++) {
    let key = keys[i - 1];
    let prop = key.name;
    let val = decodeURIComponent(match[i]);

    if (
      val !== undefined ||
      !Object.prototype.hasOwnProperty.call(params, prop)
    ) {
      params[prop] = val;
    }
  }

  return params;
};
