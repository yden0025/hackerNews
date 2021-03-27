const express = require("express");

// 创建外置路由对象
const router = express.Router();
const handler = require("./handler6");

// 注册路由
// 首页
router.get("/", (req, res) => {
  handler.showIndex(req, res);
});

// 首页
router.get("/index", (req, res) => {
  handler.showIndex(req, res);
});

// 详情页
router.get("/details", (req, res) => {
  handler.showDetails(req, res);
});

// 提交页
router.get("/submit", (req, res) => {
  handler.showSubmit(req, res);
});

// post提交数据
router.post("/add", (req, res) => {
  handler.addPost(req, res);
});

// 删除
router.get("/delete", (req, res) => {
  handler.delete(req, res);
});

// 导出
module.exports = router;
