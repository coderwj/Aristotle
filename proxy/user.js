var models  = require('../models');
var User    = models.User;
var utility = require('utility');

exports.newAndSave = function (name, pass, callback) {
  var user = new User();
  user.name = name;
  user.pass = pass;
  user.save(callback);
};

/**
 * 根据用户名列表查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户列表
 * @param {String} name 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByName = function (name, callback) {
  if (!name) {
    return callback();
  }
  User.findOne({ loginname: name }, callback);
};


/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, callback) {
  if (!id) {
    return callback();
  }
  User.findOne({_id: id}, callback);
};


/**
 * 根据查询条件，获取一个用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {String} key 激活码
 * @param {Function} callback 回调函数
 */
exports.getUserByNameAndId = function (name, id, callback) {
  User.findOne({name: name, _id: id}, callback);
};
