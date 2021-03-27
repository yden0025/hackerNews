const express = require("express");
const path = require("path");
const fs = require("fs");

//创建外置路由对象
const router = express.Router();

//注册路由
// 首页
router.get("/index", (req, res) => {
  // 1-读取所有的数据， 配合模板引擎进行渲染
  readData((data) => {
    //排序
    data.list.sort((a, b) => b.id - a.id);
    //渲染
    res.render("index.html", data);
  });
});
// 首页
router.get("/", (req, res) => {
  //重定向到/index
  res.redirect("/index");
});
// 详情页
router.get("/details", (req, res) => {
  // 1-获取前端传递id， 根据id查找对应数据，把数据渲染到页面
  let id = req.query.id;
  readData((data) => {
    //根据id查找
    let info = data.list.find((v) => v.id == id);
    //渲染
    res.render("details.html", info);
  });
});
// 提交页
router.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "submit.html"));
});

// 添加数据
router.post("/add", (req, res) => {
  //  1-获取表单的数据
  //  2-读取数据库数据
  //  3-给新数据添加id
  //  4-把新数据添加到数组中
  //  5-把添加后数据存回到数据库
  let info = req.body;
  console.log(info);
  readData((data) => {
    info.id = data.list[data.list.length - 1].id + 1; //设置id
    data.list.push(info);
    data = JSON.stringify(data, null, 4);
    writeData(data, () => {
      res.redirect("/");
    });
  });
});

//导出路由模块
module.exports = router;

//封装读取文件的方法
function readData(callback) {
  fs.readFile(
    path.join(__dirname, "data", "data.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      data = JSON.parse(data); //把数据转成对象
      //使用数据
      callback && callback(data);
    }
  );
}

function writeData(data, callback) {
  fs.writeFile(
    path.join(__dirname, "data", "data.json"),
    data,
    "utf-8",
    (err) => {
      if (err) {
        return console.log(err);
      }
      callback && callback();
    }
  );
}
