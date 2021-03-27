const fs = require('fs');
const path = require('path');
const template = require("art-template");
const mime = require("mime");
const url = require("url");
const queryString = require("querystring");
const tool = require('./tool3');

module.exports = {
  showIndex: (req, res) => {
    // 读取data.json数据，  把数据和index.html模板 进行绑定 ，生成结构， 返回给浏览器进行解析
    tool.readData(function (data) {
      //对数组进行排序
      data.list.sort((a, b) => b.id - a.id);

      //把读取的数据 和模板进行绑定
      let str = template(path.join(__dirname, "views", "index.html"), data);
      res.end(str);
    });
  },
  showDetails: (req, res) => {
    //详情页
    //1-获取前端传递数据id, 去数据库中查找对应id的数据
    //2-把数据和详情模板进行绑定 渲染，生成结构， 返回给前端浏览器进行解析
    let id = url.parse(req.url, true).query.id; //获取前端传递id

    //读取数据库的全部数据，转成对象，在根据id查找
    tool.readData((data) => {
      // 从data中找出指定id 数据 find() 查找第一个符合条件元素
      let info = data.list.find((v) => v.id == id);

      //绑定数据和模板
      let str = template(path.join(__dirname, "views", "details.html"), info);

      //返回给浏览器解析
      res.end(str);
    });
  },
  showSubmit: (req, res) => {
    // 提交页面不需要动态渲染，可以直接读取返回给浏览器即可
    fs.readFile(path.join(__dirname, "views", "submit.html"), (err, data) => {
      if (err) {
        return console.log("读取失败", err);
      }
      res.end(data); //返回
    });
  },
  showAssets: (req, res) => {
    //处理静态资源, 直接读取文件内容并返回
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) {
        return console.log("读取失败", err);
      }
      //给当前文件设置mime类型
      res.setHeader("content-type", mime.getType(req.url));
      res.end(data); //把静态资源直接返回给浏览器进行解析
    });
  },
  addGet: (req, res) => {
    //get添加
    // 1-获取前端表单提交的数据，转出对象
    let info = url.parse(req.url, true).query;

    // 2-读取data.json数据，转出对象
    tool.readData((data) => {
      //给新数据添加id, 最后一条数据id + 1
      info.id = data.list[data.list.length - 1].id + 1;

      // 3-把新数据存储到对象的数组中
      data.list.push(info);

      // 4-把数据转成json字符串，写入到data.json
      data = JSON.stringify(data, null, 4);
      tool.writeData(data, () => {
        //跳转到首页
        res.statusCode = 302; //跳转必须设置状态
        res.setHeader("location", "/index"); //跳转到首页
        res.end();
      });
    });
  },
  addPost: (req, res) => {
    //post 添加
    //有post方式传递的数据量大，用事件进行监听，多次接收，
    let str = "";
    // var num = 0;
    //监听前端post传递的数据
    req.on("data", (chunk) => {
      str += chunk; //累加数据片段
      // console.log(num++);
    });

    // 数据传递完成事件
    req.on("end", () => {
      //使用完整的数据了

      //把 str 转成对象
      let info = queryString.parse(str);

      //把数据数据取出来转出对象
      tool.readData((data) => {
        //给新数据添加id, 最后一条数据id + 1
        info.id = data.list[data.list.length - 1].id + 1;

        // 3-把新数据存储到对象的数组中
        data.list.push(info);

        // 4-把数据转成json字符串，写入到data.json
        data = JSON.stringify(data, null, 4);
        tool.writeData(data, () => {
          //跳转到首页
          res.statusCode = 302; //跳转必须设置状态
          res.setHeader("location", "/index"); //跳转到首页
          res.end();
        });
      });
    });
  },
  show404: (req, res) => {
    res.statusCode = 404;
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("页面未找到！");
  },
};

