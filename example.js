const Maritime = require("maritime");
const app = new Maritime();
const router = new Maritime.router();

router.get("*", data => {
  data.res.send("Hello World!");
});

app.mount(router);
app.listen(3000, function() {
  console.log("Server running on port 3000!");
});

if (process.env.RUNKIT_ENDPOINT_URL)
  console.log(
    `You can visit ${process.env.RUNKIT_ENDPOINT_URL} to see the server in action!`
  );
