// 专门提供数据的各种操作， 增删改查的 ，直接让handler调用即可
const mongodb = require("mongodb");
// 客户端对象
const mongodbClient = mongodb.MongoClient;
// 连接地址
const url = "mongodb://127.0.0.1:27017";

module.exports = {
  // 获取全部新闻数据
  getAllNews(callback) {
    conDB((news) => {
      news.find().toArray((err, data) => {
        if (err) {
          return console.log(err);
        }
        callback && callback(data);
      });
    });
  },
  getNewsById(id, callback) {
    id = new mongodb.ObjectID(id); //把id转成ObjectID
    conDB((news) => {
      news.find({ _id: id }).toArray((err, data) => {
        callback && callback(data[0]);
      });
    });
  },
  addNews(info, callback) {
    conDB((news) => {
      news.insert(info);
      callback && callback();
    });
  },
  deleteById(id, callback) {
    id = new mongodb.ObjectID(id); //把id转成ObjectID
    conDB((news) => {
      news.deleteOne({ _id: id });
      callback && callback();
    });
  },
};

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
