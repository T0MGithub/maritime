const Cookies = require("cookies");

module.exports = {
  set cookies(newCookieObj) {
    this.cookieObj = newCookieObj;
  },

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
