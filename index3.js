//1-搭建http服务器
const http = require("http");
const router = require("./router3");

//创建http服务器实例
const server = http.createServer();

//绑定事件，处理请求
server.on("request", (req, res) => {
  //处理路由
  router(req, res);
});

// 设置端口，启动服务器
server.listen(9999, () => {
  console.log("http://localhost:9999 服务器已启动");
});
