![Maritime NodeJS Web Framework Logo](https://i.imgur.com/psmyh0O.png)

A new type of NodeJS web framework - providing a clean, full-toolkit to develop with NodeJS. [Learn why you should start using Maritime today.](/docs/why-use-maritime.md)

[![Maritime NPM Version](https://img.shields.io/npm/v/maritime?color=blue)](https://npmjs.org/package/maritime)
[![Maritime License Badge](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
![powered by javascript badge](https://img.shields.io/badge/powered%20by-javascript-red)
![Maritime Development Badge](https://img.shields.io/badge/development-ongoing-brightgreen)
[![Try maritime on RunKit](https://img.shields.io/badge/try%20on%20runkit-maritime-brightgreen)](https://npm.runkit.com/maritime)

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

- 🚌 In-built dynamic routing - integrated, clean router system.
- ✨ [Dynamic routing engines](./docs/routing-engines.md). Use different routing engines to support the route syntax you want.
- 🔥 View engines - supports rendering templates of multiple types including EJS, Pug and Handlebars.
- ⚡️ Modern, semantic asynchronous middleware.
- 🔧 HTTP helper methods to assist you with common HTTP tasks such as redirects, sending data and downloading files to the client.
- 📕 Extensive, in-built middleware such as a body parser, static file server, method override and a cookie parser to help you get your app off the ground even faster.
- 🔒 One-command HTTPS server. Quickly and easily create HTTPS servers through `app.listen()`.

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
