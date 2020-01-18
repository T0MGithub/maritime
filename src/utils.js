const contentType = require("content-type");

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

module.exports.addGetter = function(object, name, getterFunction) {
  Object.defineProperty(object, name, {
    get: getterFunction,
    configurable: true,
    enumerable: true
  });
};

module.exports.setCharset = function setCharset(type, charset) {
  if (!type || !charset) {
    return type;
  }

  // parse type
  var parsed = contentType.parse(type);

  // set charset
  parsed.parameters.charset = charset;

  // format type
  return contentType.format(parsed);
};
