var validator      = require('validator');
var eventproxy     = require('eventproxy');
var config         = require('../config');
var tools          = require('../common/tools');
var logger = require('../common/logger');
var parentproxy = require('../proxy/parent')

//sign up
exports.showSignup = function (req, res) {
  res.render('signup');
};

exports.showSignin = function(req, res){
  res.render('signin');
};

exports.signup = function (req, res, next) {

  //id不区分大小写，且不能重复
  var id = validator.trim(req.body.id).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var rePass    = validator.trim(req.body.re_pass);

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.render('signup', {error : msg});
  });

  // 验证信息的正确性
  if ([id, pass, rePass].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }
  if (id.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (!tools.validateId(id)) {
    return ep.emit('prop_err', '用户名不合法。');
  }
  if (pass !== rePass) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }
  // END 验证信息的正确性

  parentproxy.getParentById(id, function (err, parent) {
    if (err) {
      return next(err);
    }
    if (parent) {
      ep.emit('prop_err', parent.id + '用户名已被使用。');
      return;
    }
    parentproxy.newAndSave(id, pass, function (err) {
      if(err){
        return next(err);
      }
      res.render('signin',{success : '注册成功，请登录。'});
    });
  });
};


/**
 * Handle parent login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.signin = function (req, res, next) {
  var id = validator.trim(req.body.id).toLowerCase();
  var pass      = validator.trim(req.body.pass);
  var ep        = new eventproxy();

  ep.fail(next);

  if (!id || !pass) {
    res.status(422);
    res.render('signin', { error: '信息不完整。' });
    return;
  }

  ep.on('login_error', function () {
    res.status(403);
    res.render('signin', { error: '用户名或密码错误' });
    return;
  });
  parentproxy.getParentByIdAndPass(id, pass, function (err, parent) {
    if(!parent){
      ep.emit('login_error');
      return;
    }
    res.redirect('home');
  });
};

