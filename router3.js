const handler = require("./handler3");

module.exports = function (req, res) {
  //根据用户请求返回对应的页面  判断req.url 根据请求地址，读取对应页面内容，并返回
  if (req.url.startsWith("/index") || req.url === "/") {
    handler.showIndex(req, res);
  } else if (req.url.startsWith("/details")) {
    handler.showDetails(req, res);
  } else if (req.url.startsWith("/submit")) {
    handler.showSubmit(req, res);
  } else if (req.url.startsWith("/assets")) {
    handler.showAssets(req, res);
  } else if (req.url.startsWith("/add") && req.method == "GET") {
    handler.addGet(req, res);
  } else if (req.url.startsWith("/add") && req.method == "POST") {
    handler.addPost(req, res);
  } else {
    handler.show404(req, res);
  }
};
