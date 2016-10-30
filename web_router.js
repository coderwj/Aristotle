

var express = require('express');
var sign = require('./controllers/sign');
var site = require('./controllers/site');

var router = express.Router();

// home page
router.get('/', site.index);

// sign controller
router.get('/signup', sign.showSignup);  // 跳转到注册页面
router.post('/signup', sign.signup);  // 提交注册信息
router.get('/signin', sign.showLogin);  // 进入登录页面




module.exports = router;
