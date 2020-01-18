const parse = require('co-body');
const copy = require('copy-to');
const typeis = require("type-is");

/**
 * CREDIT: Code based off of koa-bodyparser with changes
 * to work with Maritime and restyle the code and add
 * some more functionality.
 * 
 * @param [Object] options
 */

const is = function(req, type, ...types) {
  return typeis(req, type, ...types);
};

const formatOptions = function(options, type) {
  var res = {};
  copy(options).to(res);
  res.limit = options[type + 'Limit'];
  return res;
}

const extendType = function(original, extend) {
  if (extend) {
    if (!Array.isArray(extend)) {
      extend = [extend];
    }
    extend.forEach(function (extend) {
      original.push(extend);
    });
  }
}

module.exports = function (options={}) {
  let detectJSON = options.detectJSON;
  let onerror = options.onerror;

  let enableTypes = options.enableTypes || ['json', 'form'];
  let enableForm = enableTypes.includes('form');
  let enableJson = enableTypes.includes('json');
  let enableText = enableTypes.includes('text');

  let doNotParse = options.doNotParse || [];

  options.detectJSON = undefined;
  options.onerror = undefined;

  // force co-body return raw body
  options.returnRawBody = true;

  // default json types
  let jsonTypes = [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report',
  ];

  // default form types
  let formTypes = [
    'application/x-www-form-urlencoded',
  ];

  // default text types
  let textTypes = [
    'text/plain',
  ];

  let jsonOpts = formatOptions(options, 'json');
  let formOpts = formatOptions(options, 'form');
  let textOpts = formatOptions(options, 'text');

  let extendTypes = options.extendTypes || {};

  extendType(jsonTypes, extendTypes.json);
  extendType(formTypes, extendTypes.form);
  extendType(textTypes, extendTypes.text);

  async function parseBody(data) {
    if (enableJson && ((detectJSON && detectJSON(data)) || is(data.req, jsonTypes))) {
      return await parse.json(data, jsonOpts);
    }
    if (enableForm && is(data.req, formTypes)) {
      return await parse.form(data, formOpts);
    }
    if (enableText && is(data.req, textTypes)) {
      return await parse.text(data, textOpts) || '';
    }
    return {};
  }

  return async function bodyParser(data, next) {
    if (data.req.body !== undefined) return await next();
    if (doNotParse.includes(data.req.strippedPath)) return await next();

    try {
      const parsed = await parseBody(data);
      data.req.body = 'parsed' in parsed ? parsed.parsed : {};
      if (data.req.rawBody === undefined) data.req.rawBody = parsed.raw;
    } catch (err) {
      if (onerror) {
        onerror(err, data);
      } else {
        throw err;
      }
    }
    return await next();
  };
};