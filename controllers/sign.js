var validator      = require('validator');
var eventproxy     = require('eventproxy');
var config         = require('../config');
var tools          = require('../common/tools');
var logger = require('../common/logger');
var parentproxy = require('../proxy/parent');
var studentproxy = require('../proxy/student');

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
  var stuId     = validator.trim(req.body.stu_id).toLowerCase();

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.render('signup', {error : msg});
  });
  ep.on('stu_id_right',function () {
    parentproxy.getParentById(id, function (err, parent) {
      if (err) {
        return next(err);
      }
      if (parent) {
        ep.emit('prop_err', parent.id + '用户名已被使用。');
        return;
      }
      parentproxy.newAndSave(id, pass, stuId, function (err) {
        if(err){
          return next(err);
        }
        ep.emit('signin_suc');
      });
    });
  });
  ep.on('signin_suc', function() {
    studentproxy.updateHasParentById(stuId, true, function(err) {
      if(err){
        return next(err);
      }
      else{
        res.render('signin',{info : '注册成功，请登录。'});
      }
    });
  });

  // 验证信息的正确性
  if ([id, pass, rePass, stuId].some(function (item) { return item === ''; })) {
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

  //检查学生学号正确性
  studentproxy.getStudentById(stuId ,function (err, student) {
    if(err){
      return next(err);
    }
    if(student){
      if(student.has_parent){
        return ep.emit('prop_err', '该学生家长已注册。');
      }
      else{
        //正确
        return ep.emit('stu_id_right');
      }
    }
    else{
      return ep.emit('prop_err', '该学生不存在，请检查学生学号。');
    }
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
    res.cookie('id', id, { path: '/home' });
    res.render('signin', { success: '登陆成功，跳转中。。。', host: config.hostname, port: config.port });
  });
};

