const path = require("path");
const db = require("./db6");

// 处理请求各个细节
module.exports = {
  showIndex(req, res) {
    db.getAllNews((data) => {
      res.render("index.html", { list: data });
    });
  },
  showDetails(req, res) {
    // 1-获取数据id
    // 2-根据id查找对应数据
    // 3-配合模板引擎进行渲染
    // 1-获取数据id
    let id = req.query.id; //字符串id   不等于数据中对应ObjectID数据
    db.getNewsById(id, (data) => {
      //渲染
      res.render("details.html", data);
    });
  },
  showSubmit(req, res) {
    res.sendFile(path.join(__dirname, "pages", "submit.html"));
  },
  addPost(req, res) {
    // 1-获取表单数据
    // 2-把数据添加到数据库中
    // 3-重定向，看到添加结果

    // 1-获取表单数据
    let info = req.body;
    // console.log(info);
    db.addNews(info, () => {
      res.redirect("/"); //跳转到首页
    });
  },
  delete(req, res) {
    //获取id
    let id = req.query.id;
    db.deleteById(id, () => {
      res.redirect("/"); //跳转到首页
    });
  },
};
