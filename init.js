var models  = require('./models');
var init_config = require('./init_config');
var Student = models.Student;
var Teacher = models.Teacher;
var Class = models.Class;
var Parent = models.Parent;
var Information = models.Information;
var Question = models.Question;
var Answer = models.Answer;
var logger = require('./common/logger');
var classproxy = require('./proxy/class');
var studentproxy = require('./proxy/student');
var questionproxy = require('./proxy/question');
var answerproxy = require('./proxy/answer');
var informationproxy = require('./proxy/information');

var clean = function (model_name) {
	if(model_name && typeof(models[model_name]) !== 'undefined' && model_name){
		models[model_name].remove({}, function(error){
		    if(error) {
		        logger.info(error);
		    }
		    else {
		        logger.info('clean ' + model_name + '!');
		    }
		});
	}
}

var clean_all = function (reset_parent) {
	clean('Answer');
	clean('Question');
	clean('Information');
	if(reset_parent){
		clean('Parent');
	}
	clean('Student');
	clean('Teacher');
	clean('Class');
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

var set_homework = function (class_id) {

	//init homework
	var homework_t = init_config.homework_t;
	for(var i = 0; i < homework_t.length; i++){
		if(homework_t[i].class_id === class_id){
			classproxy.setHomeWork(homework_t[i].class_id, homework_t[i].subject, homework_t[i].content, closure(callback, 'setHomeWork'));
		}
	}
};

var add_scores = function (id, scores) {
	logger.info(scores);
	studentproxy.updateScore(id, 'math',    1, scores[0][0], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'Chinese', 1, scores[0][1], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'English', 1, scores[0][2], closure(callback, 'setScore'));

	studentproxy.updateScore(id, 'math',    2, scores[1][0], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'Chinese', 2, scores[1][1], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'English', 2, scores[1][2], closure(callback, 'setScore'));

	studentproxy.updateScore(id, 'math',    3, scores[2][0], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'Chinese', 3, scores[2][1], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'English', 3, scores[2][2], closure(callback, 'setScore'));

	studentproxy.updateScore(id, 'math',    4, scores[3][0], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'Chinese', 4, scores[3][1], closure(callback, 'setScore'));
	studentproxy.updateScore(id, 'English', 4, scores[3][2], closure(callback, 'setScore'));
}


exports.reinit = function (reset_parent) {
	logger.info('reinit system and database!');
	clean_all(reset_parent);

	//init student
	var stu_t = init_config.stu_t;
	for(var i = 0; i < stu_t.length; i++){
		newStudent(stu_t[i].id, stu_t[i].name, stu_t[i].class_id, closure(add_scores, stu_t[i].id, stu_t[i].score_t));
	}

	//init teacher
	var teacher_t = init_config.teacher_t;
	for(var i = 0; i < teacher_t.length; i++){
		newTeacher(teacher_t[i].id, teacher_t[i].pass, teacher_t[i].subject);
	}

	//init class
	var class_t = init_config.class_t;
	for(var i = 0; i < class_t.length; i++){
		newClass(class_t[i].id, class_t[i].head_t_id,
			class_t[i].math_t_id, class_t[i].Chinese_t_id, class_t[i].English_t_id, closure(set_homework, class_t[i].id));
	}

	var date = new Date();
	var q_id = '如何提高孩子的自控能力？';
	questionproxy.newQuestion(q_id, '如何提高孩子的自控能力？', '孩子自控能力差，有没有好的增强方法？', 'parent1', date, closure(callback, 'addQuestion'));
	answerproxy.newAnswer('同问，我也不知怎么办才好。', q_id, 'parent3', date, closure(callback, 'addAnswer'));
	answerproxy.newAnswer('多监督，严格要求，让孩子列出每日学习计划。', q_id, 'parent2', date, closure(callback, 'addAnswer'));


	//init infomation
	var info_t = init_config.info_t;
	for(var i = 0; i < info_t.length; i++){
		informationproxy.newInformation(info_t[i].id, info_t[i].id, info_t[i].content,
										info_t[i].create_t_id, date, info_t[i].class_id, closure(callback, 'addInformation'));
	}

	logger.info('reinit success!');
}