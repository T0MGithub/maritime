<div align="center">
  <br>
  <img src="https://i.imgur.com/psmyh0O.png" alt="Maritime NodeJS Web Framework Logo">

  <p>A new type of NodeJS web framework - providing a clean, full-toolkit to develop with NodeJS. <a href="./docs/why-use-maritime.md">Learn why you should start using Maritime today.</a></p>

  <a href="https://npmjs.org/package/maritime">
    <img src="https://img.shields.io/npm/v/maritime?color=blue" alt="Maritime NPM Version">
  </a>
  
  <a href="https://travis-ci.org/TomPrograms/maritime">
    <img src="https://travis-ci.org/TomPrograms/maritime.svg?branch=master" alt="Maritime Build Status">
  </a>

  <img src="https://img.shields.io/bundlephobia/minzip/maritime" alt="Maritime Zipped Size">

  <a href="https://coveralls.io/github/TomPrograms/maritime?branch=master">
    <img src="https://coveralls.io/repos/github/TomPrograms/maritime/badge.svg?branch=master&service=github" alt="Maritime Coverage Status">
  </a>

  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="Maritime License Badge">
  </a>

  <a href="https://npm.runkit.com/maritime">
    <img src="https://img.shields.io/badge/try%20on%20runkit-maritime-brightgreen" alt="Try Maritime on Runkit">
  </a>
  <br>
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

- [Maritime Examples](https://github.com/TomPrograms/maritime-examples) - A set of applications written in Maritime to show various functionalities.

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

Author: [Tom](https://github.com/TomPrograms)

This repository utilises code from other open-source projects, including NPM dependencies and some code from other open-source projects such as [Express](https://github.com/expressjs/express) and [Koa](https://github.com/koajs/koa). Thanks to the contributors to those projects and the wider open source ecosystem.

## License

[MIT](LICENSE)
