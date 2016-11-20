var models  = require('./models');
var Student = models.Student;
var Teacher = models.Teacher;
var Class = models.Class;
var Parent = models.Parent;
var logger = require('./common/logger');
var classproxy = require('./proxy/class');
var studentproxy = require('./proxy/student');

var clean = function (reset_parent) {
	if(reset_parent){
		Parent.remove({}, function(error){
		    if(error) {
		        logger.info(error);
		    }
		    else {
		        logger.info('clean Parent!');
		    }
		});
	}
	Student.remove({}, function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('clean Student!');
	    }
	});
	Teacher.remove({}, function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('clean Teacher!');
	    }
	});
	Class.remove({}, function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('clean Class!');
	    }
	});
}

var newStudent = function (id, name, class_id, callback) {
  var student = new Student();
  student.id = id;
  student.name = name;
  student.class_id = class_id;
  student.save(function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('add a Student!');
	        callback();
	    }
	});
};

var newTeacher = function (id, pass, subject) {
  var teacher = new Teacher();
  teacher.id = id;
  teacher.pass = pass;
  teacher.subject = subject;
  teacher.save(function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('add a Teacher!');
	    }
	});
};

var newClass = function (id, head_t_id, math_t_id, Chinese_t_id, English_t_id, callback) {
  var _class = new Class();
  _class.id = id;
  _class.head_t_id = head_t_id;
  _class.math_t_id = math_t_id;
  _class.Chinese_t_id = Chinese_t_id;
  _class.English_t_id = English_t_id;
  _class.save(function(error){
	    if(error) {
	        logger.info(error);
	    }
	    else {
	        logger.info('add a Class!');
	        callback();
	    }
	});
};

var closure = function () {
	var args_in = Array.prototype.slice.call(arguments);
  	var func = args_in.shift();
  	return function() {
  		var args_out = Array.prototype.slice.call(arguments);
    	return func.apply(null, args_in.concat(args_out));
  	};
}

var callback = function (type, err) {
	if(err){
		return logger.info(err);
	}
	return logger.info(type + ' success!');
};

var func1 = function () {
	classproxy.setHomeWork('class1', 'math', '这是一班的数学作业：......', closure(callback, 'setHomeWork'));
	classproxy.setHomeWork('class1', 'Chinese', '这是一班的语文作业：......', closure(callback, 'setHomeWork'));
	classproxy.setHomeWork('class1', 'English', '这是一班的英语作业：......', closure(callback, 'setHomeWork'));
};

var func2 = function () {
	classproxy.setHomeWork('class2', 'math', '这是二班的数学作业：......', closure(callback, 'setHomeWork'));
	classproxy.setHomeWork('class2', 'Chinese', '这是二班的语文作业：......', closure(callback, 'setHomeWork'));
	classproxy.setHomeWork('class2', 'English', '这是二班的英语作业：......', closure(callback, 'setHomeWork'));
};

var add_scores = function (id, scores) {
	studentproxy.updateScore('stu1', 'math', 1, scores[0][0], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'Chinese', 1, scores[0][1], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'English', 1, scores[0][2], closure(callback, 'setScore'));

	studentproxy.updateScore('stu1', 'math', 2, scores[1][0], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'Chinese', 2, scores[1][1], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'English', 2, scores[1][2], closure(callback, 'setScore'));

	studentproxy.updateScore('stu1', 'math', 3, scores[2][0], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'Chinese', 3, scores[2][1], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'English', 3, scores[2][2], closure(callback, 'setScore'));

	studentproxy.updateScore('stu1', 'math', 4, scores[3][0], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'Chinese', 4, scores[3][1], closure(callback, 'setScore'));
	studentproxy.updateScore('stu1', 'English', 4, scores[3][2], closure(callback, 'setScore'));
}


exports.reinit = function (reset_parent) {
	logger.info('reinit system and database!')
	clean(reset_parent);
	var scores_1 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu1', '学生1', 'class1', closure(add_scores, 'stu1', scores_1));

	var scores_2 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu2', '学生2', 'class1', closure(add_scores, 'stu1', scores_2));

	var scores_3 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu3', '学生3', 'class2', closure(add_scores, 'stu1', scores_3));

	var scores_4 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu4', '学生4', 'class2', closure(add_scores, 'stu1', scores_4));

	newTeacher('张老师', '1', 'math');
	newTeacher('王老师', '1', 'Chinese');
	newTeacher('李老师', '1', 'English');

	newClass('class1', '张老师', '张老师', '王老师', '李老师', func1);
	newClass('class2', '张老师', '张老师', '王老师', '李老师', func2);

	logger.info('reinit success!');
}