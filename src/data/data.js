const Cookies = require("cookies");

module.exports = {
  get cookies() {
    if (!this.cookieObj) {
      this.cookieObj = new Cookies(this.req, this.res, {
        keys: this.app.keys,
        secure: this.req.secure
      });
    }
    return this.cookieObj;
  }
};
