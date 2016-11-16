

var express = require('express');
var site = require('./controllers/site');
var sign = require('./controllers/sign');
var home = require('./controllers/home');

var router = express.Router();

// home page
router.get('/', site.index);

// sign controller
router.get('/signup', sign.showSignup);  // 进入注册页面
router.post('/signup', sign.signup);  // 注册
router.get('/signin', sign.showSignin);  // 进入登录页面
router.post('/signin', sign.signin); // 登录
router.get('/home', home.showHome);//进入主界面


module.exports = router;
