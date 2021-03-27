// 负责服务器正常启动
const express = require("express");
const router = require("./router4");
const bodyParser = require("body-parser");

// 创建服务器
const app = express();

// 配置整个项目的模板引擎
app.engine("html", require("express-art-template"));

// 模板存放目录
app.set("views", "./pages");

// 静态资源托管
app.use("/assets", express.static("assets"));

// 给req.body进行赋值
app.use(bodyParser.urlencoded({ extended: false }));

//辅助观察
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//处理路由
app.use(router);

// 设置端口，启动服务器
server.listen(9999, () => {
  console.log("http://localhost:9999 服务器已启动");
});
