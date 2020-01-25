# 🔒 HTTPS Secure Server

You can create a secure, HTTPS-enabled server within Maritime through `app.listen()` options. A HTTPS server requires three arguments within the options object - `https` must be equal to true to declare a HTTPS server, and `key` and `cert` options must also be provided for the HTTPS certificate. The `key` and `cert` options are passed to a standard NodeJS HTTPS server, and can either be the location of the relevant files or the read file data.

Passing File Paths for `key` and `cert`:

```js
app.listen(3000, {
  https: true,
  key: __dirname + "/privatekey.pem",
  cert: __dirname + "/certificate.pem"
});
```

Passing Read File Data for `key` and `cert`:

```js
const fs = require("fs");

const key = fs.readFileSync(__dirname + "/privatekey.pem");
const cert = fs.readFileSync(__dirname + "/certificate.pem");

app.listen(3000, {
  https: true,
  key,
  cert
});
```
