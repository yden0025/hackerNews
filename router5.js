const express = require("express");
const path = require("path");
const mongodb = require("mongodb");

// 客户端对象
const mongodbClient = mongodb.MongoClient;

// 连接地址
const url = "mongodb://127.0.0.1:27017";

// 创建外置路由对象
const router = express.Router();

// 注册路由
// 首页
router.get("/", (req, res) => {
  conDB((news) => {
    news.find().toArray((err, data) => {
      if (err) {
        return console.log(err);
      }
      //渲染
      res.render("index.html", { list: data });
    });
  });
});

// 首页
router.get("/index", (req, res) => {
  res.redirect("/");
});

// 详情页
router.get("/details", (req, res) => {
  // 1-获取数据id
  // 2-根据id查找对应数据
  // 3-配合模板引擎进行渲染
  // 1-获取数据id
  let id = req.query.id; //字符串id   不等于数据中对应ObjectID数据
  // 字符串形式id转成ObjectID后台，再去数据库中查找
  id = new mongodb.ObjectID(id);
  // 2-根据id去数据库中， 查找对应数据,
  conDB((news) => {
    news.find({ _id: id }).toArray((err, data) => {
      console.log(data); //数组
      //渲染
      res.render("details.html", data[0]);
    });
  });
});

// 提交页
router.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "submit.html"));
});

// post提交数据
router.post("/add", (req, res) => {
  // 1-获取表单数据
  // 2-把数据添加到数据库中
  // 3-重定向，看到添加结果

  // 1-获取表单数据
  let info = req.body;
  // console.log(info);
  conDB((news) => {
    news.insert(info); //插入数据
    res.redirect("/"); //重定向
  });
});

// 删除
router.get("/delete", (req, res) => {
  //获取id
  let id = req.query.id;
  //id转出ObjectID
  id = new mongodb.ObjectID(id);
  //根据id进行删除
  conDB((news) => {
    news.deleteOne({ _id: id }); //删除
    res.redirect("/"); //重新渲染
  });
});

// 导出
module.exports = router;

//封装连接数据库的方法
function conDB(callback) {
  mongodbClient.connect(url, (err, client) => {
    if (err) {
      return console.log("数据库连接失败", err);
    }
    // 选择集合
    let news = client.db("hk").collection("news");
    // 操作集合
    callback && callback(news);
    // 关闭数据库
    client.close();
  });
}
