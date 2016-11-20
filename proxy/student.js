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

exports.updateMathDoneById = function (id, math_done, callback) {
	var update = {$set : {math_done : math_done}};
	Student.update({id : id}, update, {}, function(error){
	    if(error) {
	        console.log(error);
	        callback(error);
	    } else {
	        callback();
	    }
	});
};

exports.updateChineseDoneById = function (id, Chinese_done, callback) {
	var update = {$set : {Chinese_done : Chinese_done}};
	Student.update({id : id}, update, {}, function(error){
	    if(error) {
	        console.log(error);
	        callback(error);
	    } else {
	        callback();
	    }
	});
};

exports.updateEnglishDoneById = function (id, English_done, callback) {
	var update = {$set : {English_done : English_done}};
	Student.update({id : id}, update, {}, function(error){
	    if(error) {
	        console.log(error);
	        callback(error);
	    } else {
	        callback();
	    }
	});
};

exports.updateScore = function (id, subject, time, score, callback) {
	if((subject === 'math' || subject === 'Chinese' || subject === 'English') &&
		(time === 1 || time === 2 || time === 3 || time ===4)){
		var update = {$set : {[subject + '_score_' + time] : score}};
		Student.update({id : id}, update, {}, function(error){
			if(error) {
				console.log(error);
				callback(error);
			} else {
				callback();
			}
		});
	}
	else{
		console.log('error parms');
		callback('error parms');
	}
};

