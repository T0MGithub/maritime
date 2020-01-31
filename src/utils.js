const contentType = require("content-type");

/**
 * Function to return list of standard HTTP verbs.
 *
 * @return {List} List of standard HTTP verbs.
 */
module.exports.nodeHttpVerbs = () => [
  "get",
  "post",
  "put",
  "head",
  "delete",
  "options",
  "trace",
  "copy",
  "lock",
  "mkcol",
  "move",
  "purge",
  "propfind",
  "proppatch",
  "unlock",
  "report",
  "mkactivity",
  "checkout",
  "merge",
  "m-search",
  "notify",
  "subscribe",
  "unsubscribe",
  "patch",
  "search",
  "connect"
];

/**
 * Function to add a getter function to an object.
 *
 * @param {Object} [object] Object to add the getter function to.
 * @param {String} [name] Name of getter function to add.
 * @param {Function} [getterFunction] Actual getter function.
 */
module.exports.addGetter = function(object, name, getterFunction) {
  Object.defineProperty(object, name, {
    get: getterFunction,
    configurable: true,
    enumerable: true
  });
};

/**
 * Function to add a setter function to an object.
 *
 * @param {Object} [object] Object to add the setter function to.
 * @param {String} [name] Name of setter function to add.
 * @param {Function} [setterFunction] Actual setter function.
 */
module.exports.addSetter = function(object, name, setterFunction) {
  Object.defineProperty(object, name, {
    set: setterFunction,
    configurable: true,
    enumerable: true
  });
};

/**
 * Checks whether dependencies required for bodyParser are installed.
 *
 * @return {Boolean}
 */
module.exports.bodyParserDependenciesInstalled = function() {
  try {
    require("copy-to");
    require("co-body");
    require("type-is");
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Function to format Content-Type with different charset.
 *
 * @param {String} [header] Content-Type header to format.
 * @param {String} [charset] Charset to format Content-Type header with.
 * @return {String} Formatted content-type header with different charset.
 */
module.exports.setCharset = function setCharset(header, charset) {
  if (!header || !charset) {
    return header;
  }

  // parse type
  let parsed = contentType.parse(header);

  // set charset
  parsed.parameters.charset = charset;

  // format type
  return contentType.format(parsed);
};
