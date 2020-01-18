const maritime = require("./src/maritime.js");
const router = require("./src/router/router.js");
const static = require("./src/middleware/static.js");

module.exports = maritime;
module.exports.router = router;
module.exports.static = static;
