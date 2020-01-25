# Why use Maritime?

Maritime aims to be a complete web framework experience, and equip developers with a set of tools to quickly develop web applications. Each web framework is crafted differently and is best suited to certain uses. Below is a comparison chart of some popular web frameworks againt Maritime.

|                   Feature | Maritime          | Koa               | Connect          | Express           |
| ------------------------: | ----------------- | ----------------- | ---------------- | ----------------- |
|         Middleware Kernel | ✓                 | ✓                 | ✓                | ✓                 |
|          In-Built Routing | ✓                 |                   |                  | ✓                 |
|        Template Rendering | ✓                 |                   |                  | ✓                 |
|                Send Files | ✓                 |                   |                  | ✓                 |
|   One-Command HTTP Server | ✓                 | ✓                 |                  | ✓                 |
|  One-Command HTTPS Server | ✓                 |                   |                  |                   |
|      In-built Body Parser | ✓                 |                   |                  | ✓                 |
| In-built Cookie Functions | ✓                 | ✓                 |                  |
|       HTTP Helper Methods | ✓                 | ✓                 |                  | ✓                 |
|             Context Style | Single Object     | Single Object     | Separate Objects | Separate Objects  |
|            Response Style | Immediate Command | End of Middleware | HTTP Methods     | Immediate Command |
|              Dependancies | 7                 | 24                | 4                | 30                |

### Table Explanation

#### One-Command HTTP Server

One command HTTP server indicates whether a framework has a command to start a HTTP server, for example `app.listen(3000)` in Maritime.

#### One-Command HTTPS Server

One command HTTPS server indicates whether a framework has a command to start a NodeJS HTTPS server. In Maritime,
a HTTPS server can be started through `app.listen()`.

```js
app.listen(3000, {
  https: true,
  key: __dirname + "/privatekey.pem",
  cert: __dirname + "/certificate.pem"
});
```

#### HTTP Helper Methods

HTTP help methods indicates whether additional functions are included with each request to assist with responding to that request.

#### Context Style

Context style indicates how data is passed to each middleware, either through a single object that includes both request and response data or through separate objects.

#### Response Style

Response Style indicates how each web framework is designed to reply to requests. Immediate commands mean methods on the response object can be invoked to immediately respond to each request, end of middleware indicates a response is sent at the end of all middleware using data set in the middleware, HTTP Methods mean only bare-bones HTTP methods can be used to reply to each request.
