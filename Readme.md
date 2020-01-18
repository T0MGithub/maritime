![Maritime NodeJS Web Framework Logo](https://i.imgur.com/psmyh0O.png)

A new NodeJS web framework - merging the best syntax of frameworks for a fast, modern experience.

[![Maritime NPM Version](https://img.shields.io/npm/v/maritime?color=blue)](https://npmjs.org/package/maritime)
[![Maritime License Badge](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
![powered by javascript badge](https://img.shields.io/badge/powered%20by-javascript-red)
![Maritime Development Badge](https://img.shields.io/badge/development-ongoing-brightgreen)

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

## Installation

Maritime requires Node v7.6.0 or higher for async and promise functionality.

```
$ npm i maritime --save
```

## Credit

Author: [Tom](https://github.com/t0mgithub)

This repository utilises code from other open-source projects, including NPM dependencies and some code from other open-source projects such as [Express](https://github.com/expressjs/express) and [Koa](https://github.com/koajs/koa). Thanks to the contributors to those projects and the wider open source ecosystem.

## License

[MIT](LICENSE)
