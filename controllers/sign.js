var validator      = require('validator');
var eventproxy     = require('eventproxy');
var config         = require('../config');
var tools          = require('../common/tools');

//sign up
exports.showSignup = function (req, res) {
  res.render('sign/signup');
};

exports.showLogin = function(req, res){
  res.render('sign/login');
};

exports.signup = function (req, res, next) {
  var loginname = validator.trim(req.body.loginname).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var rePass    = validator.trim(req.body.re_pass);

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.render('sign/signup', {error: msg, loginname: loginname});
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
};


/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.login = function (req, res, next) {
  var loginname = validator.trim(req.body.name).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var ep        = new eventproxy();

  ep.fail(next);

  if (!loginname || !pass) {
    res.status(422);
    return res.render('sign/signin', { error: '信息不完整。' });
  }

  ep.on('login_error', function (login_error) {
    res.status(403);
    res.render('sign/signin', { error: '用户名或密码错误' });
  });

};

