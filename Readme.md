![Maritime NodeJS Web Framework Logo](https://i.imgur.com/psmyh0O.png)

<div style="text-align: center; width: 100%;">
  <p>A new type of NodeJS web framework - providing a clean, full-toolkit to develop with NodeJS. <a href="./docs/why-use-maritime.md>Learn why you should start using Maritime today."</a></p>
  
  <a href="https://npmjs.org/package/maritime">
    <img alt="Maritime NPM Version" src="https://img.shields.io/npm/v/maritime?color=blue">
  </a>
  <img alt="Minified NPM Module Size" src="https://img.shields.io/bundlephobia/minzip/maritime">
  <a href="https://travis-ci.org/T0MGithub/maritime">
    <img alt="Maritime Build Status" src="https://travis-ci.org/T0MGithub/maritime.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/T0MGithub/maritime?branch=master">
    <img alt="Maritime Coverage Status" src="https://coveralls.io/repos/github/T0MGithub/maritime/badge.svg?branch=master&service=github">
  </a>
  <a href="./LICENSE">
    <img alt="Maritime License Badge" src="https://img.shields.io/badge/license-MIT-blue">
  </a>
  <a href="https://npm.runkit.com/maritime">
    <img alt="Try maritime on RunKit" src="https://img.shields.io/badge/try%20on%20runkit-maritime-brightgreen">
  </a>
</div>

```js
const Maritime = require("maritime");
const app = new Maritime();
const router = new Maritime.router();

router.get("*", data => {
  data.res.send("Hello World!");
});

app.mount(router);
app.listen(3000);
```

## Getting Started

- [Maritime Examples](https://github.com/t0mgithub/maritime-examples) - A set of applications written in Maritime to show various functionalities.

## Features

- 🚌 In-built routing - integrated, clean router system.
- ✨ [Dynamic routing engines](./docs/routing-engines.md) - Use different routing engines to support the route syntax you want.
- 🔥 [View engines](./docs/view-engines.md) - supports rendering templates of multiple types including EJS, Pug and Handlebars.
- ⚡️ Modern, semantic asynchronous middleware.
- 🔧 HTTP helper methods - helper methods are included to assist you with common HTTP tasks such as redirects, sending data and downloading files to the client.
- 📕 Extensive, in-built middleware such as a body parser, static file server, method override and a cookie parser to help you get your app off the ground even faster.
- 🔒 [One-command HTTPS server](./docs/https-secure-server.md) - Quickly and easily create HTTPS servers through `app.listen()`.

## Installation

Maritime requires Node v7.6.0 or higher for async and promise functionality.

```
$ npm i maritime
```

## Credit

Author: [Tom](https://github.com/t0mgithub)

This repository utilises code from other open-source projects, including NPM dependencies and some code from other open-source projects such as [Express](https://github.com/expressjs/express) and [Koa](https://github.com/koajs/koa). Thanks to the contributors to those projects and the wider open source ecosystem.

## License

[MIT](LICENSE)
