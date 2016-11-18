var models  = require('../models');
var Class = models.Class;

exports.getClassById = function (id, callback) {
  Class.findOne({id: id}, callback);
};

exports.setHomeWork = function (id, subject, content, callback) {
	if(typeof(id) === 'undefined' || typeof(subject) === 'undefined' || typeof(content) === 'undefined'){
		return callback('error parms');
	}
	var update = {$set : {math_hw: content}};
	if(subject === 'math'){
		update = {$set : {math_hw: content}};
	}
	else if(subject ==='Chinese'){
		update = {$set : {Chinese_hw: content}};
	}
	else if(subject ==='English'){
		update = {$set : {English_hw: content}};
	}
	else{
		return callback('error subject');
	}
	Class.update({id : id}, update, {}, function(error){
	    if(error) {
	        console.log(error);
	        callback(error);
	    } else {
	        callback();
	    }
	});
};