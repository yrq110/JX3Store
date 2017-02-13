# 剑三小铺

web入门所写的第一个小应用，网游虚拟物品商店。

本项目使用Node + Express + Materialize + MongoDB开发。

<h3 align="center">Demo: http://jx3ah.herokuapp.com/</h3>

<p align="center">
  <a href="http://jx3ah.herokuapp.com/" target="\_blank">
    <img src="https://github.com/yrq110/JX3Store/blob/master/public/images/main_page_screenshot.png" width="700px">
  </a>
</p>


## 功能

* 使用不同组件花式展示商品

## 主要使用

前端:
* jquery
* materialize

后端:
* node
* express
* mongoose
* mongodb

## 构建

1. 安装依赖

  ```bash
  npm install
  ```
2. 运行

  ```bash
  node bin/www  
  # server at http://127.0.0.1:3000
  ```


## 数据库
在routes/index.js文件中:
```javascript
mongoose.connect('mongodb://YOUR_DB');
```
将YOUR_DB改为你的mongodb数据库的地址。

## 证书

[MIT](http://opensource.org/licenses/MIT)
