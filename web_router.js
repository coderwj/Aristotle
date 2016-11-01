

var express = require('express');
var sign = require('./controllers/sign');
var site = require('./controllers/site');

var router = express.Router();

// home page
router.get('/', site.index);

// sign controller
router.get('/signup', sign.showSignup);  // 进入注册页面
router.post('/signup', sign.signup);  // 注册
router.get('/signin', sign.showSignin);  // 进入登录页面
router.post('/signin', sign.signin); // 登录



module.exports = router;
