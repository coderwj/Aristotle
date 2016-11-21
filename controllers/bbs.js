var parentproxy = require('../proxy/parent');
var questionproxy = require('../proxy/question');
var answerproxy = require('../proxy/answer');

exports.addQuestion = function (req, res, next) {
	var parent_id = req.cookies.id;
	var title = req.body.title;
	var content = req.body.content;
	var now_date = new Date();
	var id = title;
	if(typeof(parent_id) !== 'undefined' && parent_id ||
	   typeof(title) !== 'undefined' && title ||
	   typeof(content) !== 'undefined' && content){
		questionproxy.newQuestion(id, title, content, parent_id, now_date, function (err) {
			if(err){
				return res.sendStatus(403);
			}
			res.redirect('/home/bbs');
		});
	}
	else{
		return res.sendStatus(403);
	}
}

exports.seeAnswer = function (req, res, next) {
	if(typeof(req.query.question_id) !== 'undefined' && req.query.question_id){
		answerproxy.findAnswers(req.query.question_id, function (err, answers) {
			if(err){
				return res.sendStatus(403);
			}
			res.cookie('q_id', req.query.question_id, {path: '/home/bbs/answer'});
			res.cookie('q_id', req.query.question_id, {path: '/home/bbs/addAnswer'});
			res.render('home/answer', {answers: answers});
		});
	}
	else{
		return res.sendStatus(403);
	}
}

exports.addAnswer = function (req, res, next) {
	var parent_id = req.cookies.id;
	var q_id = req.cookies.q_id;
	var content = req.body.content;
	var now_date = new Date();
	console.log(content);
	console.log(q_id);
	console.log(parent_id);
	console.log(now_date);
	if(typeof(parent_id) !== 'undefined' && parent_id ||
	   typeof(q_id) !== 'undefined' && title ||
	   typeof(content) !== 'undefined' && content){
		answerproxy.newAnswer(content, q_id, parent_id, now_date, function (err) {
			if(err){
				console.log('----------here2----------')
				return res.sendStatus(403);
			}
			res.redirect('/home/bbs/answer?question_id=' + q_id);
		});
	}
	else{
		console.log('----------here1----------')
		return res.sendStatus(403);
	}
}