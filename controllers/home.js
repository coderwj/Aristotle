var parentproxy = require('../proxy/parent');
var studentproxy = require('../proxy/student');
var classproxy = require('../proxy/class');
var teacherproxy = require('../proxy/teacher');
var questionproxy = require('../proxy/question');
var informationproxy = require('../proxy/information');
//sign up
exports.showHome = function (req, res) {
	var id = req.cookies.id
	if(typeof(id) !== 'undefined' && id){
		res.cookie('id', req.cookies.id, {path: '/home/user'});
		res.cookie('id', req.cookies.id, {path: '/home/study'});
		res.cookie('id', req.cookies.id, {path: '/home/community'});
		res.cookie('id', req.cookies.id, {path: '/home/bbs'});
		res.cookie('id', req.cookies.id, {path: '/home/bbs/addQuestion'});
		res.cookie('id', req.cookies.id, {path: '/home/info'});
  		res.redirect('/home/user');
	}
	else{
		res.sendStatus(403);
	}
};

exports.showUser = function (req, res) {
	var id = req.cookies.id
	if(typeof(id) !== 'undefined' && id){
		parentproxy.getParentById(id, function (err, parent) {
		    if(!parent){
		      return res.sendStatus(403);
		    }
		    studentproxy.getStudentById(parent.stu_id ,function (err, student) {
			    if(!student){
			    	return res.sendStatus(403);
			    }
			    res.cookie('stu_id', student.id, {path: '/home/study'});
			    classproxy.getClassById(student.class_id, function (err, _class) {
			    	if(!_class){
				    	return res.sendStatus(403);
				    }
				    res.cookie('class_id', _class.id, {path: '/home/study'});
				    teacherproxy.getTeacherById(_class.head_t_id, function (err, teacher) {
				    	if(!teacher){
				    		return res.sendStatus(403);
				    	}
				    	var parms = {id: id, stu_name: student.name, stu_class: student.class_id, head_t: teacher.id};
				    	res.render('home/user', parms);
				    });
			    });
			});
		 });
	}
	else{
		res.sendStatus(403);
	}
};

exports.showStudy = function (req, res) {
	var class_id = req.cookies.class_id
	classproxy.getClassById(class_id, function (err, _class) {
    	if(!_class){
	    	return res.sendStatus(403);
	    }
	    var stu_id = req.cookies.stu_id
	    studentproxy.getStudentById(stu_id ,function (err, student) {
		    if(!student){
		    	return res.sendStatus(403);
		    }
		    var parms = { math_hw: _class.math_hw,
	    				  Chinese_hw: _class.Chinese_hw,
	    				  English_hw: _class.English_hw,
	    				  math_done: student.math_done,
	    				  Chinese_done: student.Chinese_done,
	    				  English_done: student.English_done };

		    parms.math_score = [student.math_score_1, student.math_score_2, student.math_score_3, student.math_score_4];
		    parms.Chinese_score = [student.Chinese_score_1, student.Chinese_score_2, student.Chinese_score_3, student.Chinese_score_4];
		    parms.English_score = [student.English_score_1, student.English_score_2, student.English_score_3, student.English_score_4];
		    res.render('home/study', parms);
		});
    });
};

exports.showCommunity = function (req, res) {
  	res.render('home/community');
};

exports.showBbs = function (req, res) {
	questionproxy.findAllQuestion(function (err, questions) {
		if(err){
			return res.sendStatus(403);
		}
		res.render('home/bbs', {questions: questions});
	});
};

exports.showInfo = function (req, res) {
	informationproxy.findAllInformation(function (err, informations) {
		if(err){
			return res.sendStatus(403);
		}
		res.render('home/info', {informations: informations});
	});
};

exports.Quit = function (req, res) {
	res.clearCookie('id', {path: '/home'});
	res.clearCookie('id', {path: '/home/user'});
	res.clearCookie('id', {path: '/home/study'});
	res.clearCookie('id', {path: '/home/community'});
	res.clearCookie('id', {path: '/home/bbs'});
	res.clearCookie('id', {path: '/home/bbs/addQuestion'});
	res.clearCookie('id', {path: '/home/info'});

  	res.render('signin', { info: '注销成功' });
};