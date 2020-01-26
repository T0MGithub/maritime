# Routing Engines

Different web-frameworks support routing in different ways - for example a wildcard in a traditional express-style router would look like `/file/*`, however in the official KoaJS router the syntax for a wildcard would look like `/file/(.*)`. Each routing style has advantages and disadvantages, which is why Maritime has routing engines. Routing engines can be loaded globally to Maritime, or specifically to each router in order support the routing syntax you want to use. By default, Maritime uses [maritime-standard-routing](https://github.com/t0mgithub/maritime-standard-routing) for the routing engine which enables express-style routing.

## Engines for Maritime

- 🔥 [Standard Engine](https://github.com/t0mgithub/maritime-standard-routing) - default engine for Maritime, enables the traditional Express framework syntax.
- ⚡️ [Modern Engine](https://github.com/t0mgithub/maritime-modern-routing) - alternative engine for Maritime, enables modern path-to-regexp style routing as seen in the KoaJS router.

## Usage

Routing engines can either be set globally, enabling them for all routers, or on a per-router basis. Routers will only inherit the global default routing engine if no router-specific engine is set.

```js
// globally active the modern routing engine
app.set("routing-engine", require("maritime-modern-engine"));
```

```js
// set engine for specific router
const router = new Maritime.router({
  engine: require("maritime-modern-engine");
});
```

Example showing how to use different syntaxes for each engine:

```js
const Maritime = require("maritime");
const app = new Maritime();
// router1 doesn't have an engine option specified, so it will default to the global engine
// which by default is maritime-standard-routing
const router1 = new Maritime.router();
// router2 has an engine option specified, so it will use the maritime-modern-routing
// engine provided rather than the global routing engine
const router2 = new Maritime.router({
  engine: require("maritime-modern-routing")
});

// router1 can use maritime-standard-routing, express-style syntax
router1.get("/a/*", data => {
  data.res.send(data.req.params);
});

// router2 can use maritime-modern-routing style syntax
router2.get("/b/(.*)", data => {
  data.res.send(data.req.params);
});

app.mount(router1);
app.mount(router2);
app.listen(3000);
```

## Engine Internals

If you wish to create a routing engine, you must be aware of how an engine is structured. Each engine must be a class and contain at least three methods to act as an API for Maritime: `createRegex()`, `match()` and `createParams()`.

```js
class RoutingEngine {
  constructor(options) {
    this.options = options || {};
  }

  /**
   * Although the createRegex route doesn't HAVE to create a regexp, its purpose is to
   * prepare the engine to match a requested path based on the provided route. This function
   * will be invoked on a router being mounted. Any data the engine will use later for route
   * matching should be saved to the engine object.
   *
   * @param {String} [route] Route provided to the router.
   */
  createRegex(route) {}

  /**
   * The match function is used to indicate whether the requested path is a match to the
   * route. This function should return true or false. If this function returns true, the
   * createParams function will be invoked and the relevant middleware to the route
   * will be executed. If the engine requires any data for the createParams function, it
   * should be saved to the engine object.
   *
   * @param {String} [path] Path requested over HTTP.
   * @return {Boolean} Whether the requested path is a match to the router.
   */
  match(path) {}

  /**
   * This function should create an object of router parameters. This function will only be
   * invoked if match() returns true.
   *
   * e.g.
   * route = '/:name'
   * path = '/tom'
   * parameter object returned = {'name': 'tom'}
   *
   * @param {String} [path] Path requested over HTTP.
   * @return {Object} Object of route parameters.
   */
  createParams(path) {}
}
```
