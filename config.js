/**
 * config
 */

var path = require('path');

var config = {
  debug: true,

  name: 'Aristotle',
  name_ch: '家校沟通系统',
  description: 'Aristotle：专业的老师和家长的沟通平台',

  // 添加到 html head 中的信息
  site_headers: [
    '<meta name="author" content="WRW" />'
  ],

  site_icon: '/public/images/icon.png',

  //域名
  host: 'localhost',
  // 程序运行的端口
  port: 3000,

  // mongodb 配置
  db: 'mongodb://127.0.0.1/Aristotle',

  reinit: true,

};

module.exports = config;
