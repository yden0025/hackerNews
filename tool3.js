const fs = require("fs");
const path = require("path");

module.exports = {
  // 封装读取文件数据并转成对象方法
  readData(callback) {
    fs.readFile(
      path.join(__dirname, "data", "data.json"),
      "utf-8",
      (err, data) => {
        if (err) {
          return console.log("读取失败", err);
        }

        //把json字符串转出对象
        data = JSON.parse(data);

        //把数据交给回调函数进行处理
        callback && callback(data);
      }
    );
  },
  writeData(data, callback) {
    fs.writeFile(
      path.join(__dirname, "data", "data.json"),
      data,
      "utf-8",
      (err) => {
        if (err) {
          return console.log("写入失败", err);
        }
        //写入数据完成后回调函数
        callback && callback();
      }
    );
  }
};
