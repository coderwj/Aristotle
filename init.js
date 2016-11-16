var models  = require('./models');
var Student = models.Student;
var Teacher = models.Teacher;
var Class = models.Class;
var Parent = models.Parent;
var logger = require('./common/logger');

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

var newStudent = function (id, name, class_id) {
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

var newClass = function (id, head_t_id, math_t_id, Chinese_t_id, English_t_id) {
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
	    }
	});
};

exports.reinit = function (reset_parent) {
	logger.info('reinit system and database!')
	clean(reset_parent);
	newStudent('stu1', '学生1', 'class1');
	newStudent('stu2', '学生2', 'class1');
	newStudent('stu3', '学生3', 'class2');
	newStudent('stu4', '学生4', 'class2');

	newTeacher('张老师', '1', 'math');
	newTeacher('王老师', '1', 'Chinese');
	newTeacher('李老师', '1', 'English');

	newClass('class1', '张老师', '张老师', '王老师', '李老师');
	newClass('class2', '张老师', '张老师', '王老师', '李老师');

	logger.info('reinit success!');
}