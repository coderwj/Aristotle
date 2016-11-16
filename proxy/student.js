var models  = require('../models');
var Student = models.Student;

exports.getStudentById = function (id, callback) {
  Student.findOne({id: id}, callback);
};

exports.updateHasParentById = function (id, has_parent, callback) {
	var update = {$set : {has_parent : true}};
	Student.update({id : id}, update, {}, function(error){
	    if(error) {
	        console.log(error);
	        callback(error);
	    } else {
	        callback();
	    }
	});
};
