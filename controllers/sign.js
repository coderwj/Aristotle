var validator      = require('validator');
var eventproxy     = require('eventproxy');
var config         = require('../config');
var tools          = require('../common/tools');
var logger = require('../common/logger');
var userproxy = require('../proxy/user')

//sign up
exports.showSignup = function (req, res) {
  res.render('signup');
};

exports.showSignin = function(req, res){
  res.render('signin');
};

exports.signup = function (req, res, next) {

  var loginname = validator.trim(req.body.loginname).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var rePass    = validator.trim(req.body.re_pass);

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.render('signup', {error: msg, loginname: loginname});
  });

  // 验证信息的正确性
  if ([loginname, pass, rePass].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }
  if (loginname.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (!tools.validateId(loginname)) {
    return ep.emit('prop_err', '用户名不合法。');
  }
  if (pass !== rePass) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }
  // END 验证信息的正确性

  userproxy.getUserByName(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      ep.emit('prop_err', user.name + '用户名已被使用。');
      return;
    }
    userproxy.newAndSave(loginname, pass, function (err) {
      if(err){
        return next(err);
      }
      res.render('signin',{success : '注册成功，请登录。'});
    });
  });
};


/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.signin = function (req, res, next) {
  var loginname = validator.trim(req.body.name).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var ep        = new eventproxy();

  ep.fail(next);

  if (!loginname || !pass) {
    res.status(422);
    res.render('signin', { error: '信息不完整。' });
    return;
  }

  ep.on('login_error', function (login_error) {
    res.status(403);
    res.render('signin', { error: '用户名或密码错误' });
    return;
  });
  res.render('signin', { success: '登录成功进入主页。。。' });
};

