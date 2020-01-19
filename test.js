const Maritime = require("./index.js");
const app = new Maritime();
const router = new Maritime.router();

router.get("/", data => {
  data.res.send(data.req.iplist);
});

app.mount(router);
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
