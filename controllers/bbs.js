var parentproxy = require('../proxy/parent');
var questionproxy = require('../proxy/question');

exports.addQuestion = function (req, res, next) {
	var parent_id = req.cookies.id;
	var title = req.body.title;
	var content = req.body.content;
	var now_date = new Date();
	var id = title + now_date.toString();
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

}