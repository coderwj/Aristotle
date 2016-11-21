

var express = require('express');
var site = require('./controllers/site');
var sign = require('./controllers/sign');
var home = require('./controllers/home');

var study = require('./controllers/study');
var bbs = require('./controllers/bbs');

var router = express.Router();

// home page
router.get('/', site.index);

// sign controller
router.get('/signup', sign.showSignup);  // 进入注册页面
router.post('/signup', sign.signup);  // 注册
router.get('/signin', sign.showSignin);  // 进入登录页面
router.post('/signin', sign.signin); // 登录

router.get('/home', home.showHome);//进入主界面
router.get('/home/user', home.showUser);//进入个人中心
router.get('/home/study', home.showStudy);//进入学习监督
router.get('/home/community', home.showCommunity);//进入在线交流
router.get('/home/bbs', home.showBbs);//进入家长社区
router.get('/home/info', home.showInfo);//进入消息平台
router.get('/home/quit', home.Quit);//退出登录

router.post('/home/study', study.homeworkEnsure);//作业监督确认

router.post('/home/bbs/addQuestion', bbs.addQuestion);//增加问题
router.get('/home/bbs/answer', bbs.seeAnswer);//查看问题
router.post('/home/bbs/addAnswer', bbs.addAnswer);//回答问题

module.exports = router;
