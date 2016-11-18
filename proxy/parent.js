var models  = require('../models');
var Parent    = models.Parent;
var utility = require('utility');

exports.newAndSave = function (id, pass, stuId, callback) {
  var parent = new Parent();
  parent.id = id;
  parent.pass = pass;
  parent.stu_id = stuId;
  parent.save(callback);
};

/**
 * 根据用户ID，查找家长
 * Callback:
 * - err, 数据库异常
 * - parent, 家长
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getParentById = function (id, callback) {
  Parent.findOne({id: id}, callback);
};

exports.getParentByIdAndPass = function (id, pass, callback) {
  if(!id || !pass){
    return callback();
  }
  Parent.findOne({id : id, pass : pass}, callback);
}