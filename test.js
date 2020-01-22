const Maritime = require("./index.js");
const app = new Maritime();
const router = new Maritime.router();

router.get("/a*a", data => {
  data.res.send("ok");
});

app.mount(router);
app.listen(3000);
