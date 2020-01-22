const Maritime = require("./index.js");
const app = new Maritime();
const router = new Maritime.router();

router.get("*", data => {
  data.res.send("Hello World!");
});

app.mount(router);
app.listen(3000, function() {
  let msg =
    process.env.RUNKIT_ENDPOINT_URL !== undefined
      ? `Server running on port 3000! You can visit ${process.env.RUNKIT_ENDPOINT_URL} to see the server in action!`
      : "Server running on port 3000!";
  console.log(msg);
});
