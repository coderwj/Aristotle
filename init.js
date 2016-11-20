var models  = require('./models');
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

	var scores_1 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu1', '学生1', 'class1', closure(add_scores, 'stu1', scores_1));

	var scores_2 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu2', '学生2', 'class1', closure(add_scores, 'stu2', scores_2));

	var scores_3 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu3', '学生3', 'class2', closure(add_scores, 'stu3', scores_3));

	var scores_4 = [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']];
	newStudent('stu4', '学生4', 'class2', closure(add_scores, 'stu4', scores_4));

	newTeacher('张老师', '1', 'math');
	newTeacher('王老师', '1', 'Chinese');
	newTeacher('李老师', '1', 'English');

	newClass('class1', '张老师', '张老师', '王老师', '李老师', func1);
	newClass('class2', '张老师', '张老师', '王老师', '李老师', func2);

	var date = new Date();
	questionproxy.newQuestion('如何提高孩子的自控能力？' + date.toString(), '如何提高孩子的自控能力？', '孩子自控能力差，有没有好的增强方法？', 'parent1', date, closure(callback, 'addQuestion'));

	var content1 = '根据国家相关部门关于2014年节假日安排的通知，结合我单位工作实际情况，现将2014年国庆节放假的有关事项安排如下：\n' +
				  '10月1日至7日放假调休，共7天。\n' +
				  '9月28日(星期日)、10月11日(星期六)上班。\n' +
				  '请各部门妥善安排好值班和安全、保卫等工作，遇有重大突发事件发生，要按规定及时报告并妥善处置，确保度过一个平安愉快的假期。';

	var content2 = '为满足西土城路校区部分同学希望延长晚间自习时间的需求，经学校有关部门研究，决定自即日起将教三楼129、131、133三间教室的开放时间延长至23:00，现将相关事宜通知如下：' +
					'1．延长自习室开放时间是为了满足部分学生的学习需要，学校鼓励同学们按照正常作息时间学习和生活；' +
					'2．请在教室自习的学生自觉维护室内卫生，爱护室内设施，保持安静、良好的自习环境；' +
					'3．安全起见，23:00以后回宿舍就寝的同学，请尽量结伴而行；';

	informationproxy.newInformation('国庆节放假通知' + date.toString(), '元旦节放假通知', content1, '张老师', date, 'class1', closure(callback, 'addInformation'));
	informationproxy.newInformation('关于延长自习室开放时间的通知' + date.toString(), '关于延长自习室开放时间的通知', content2, '张老师', date, 'class1', closure(callback, 'addInformation'));

	logger.info('reinit success!');
}