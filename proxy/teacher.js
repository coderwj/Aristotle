var models  = require('../models');
var Teacher = models.Teacher;

exports.getTeacherById = function (id, callback) {
  Teacher.findOne({id: id}, callback);
};