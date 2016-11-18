var studentproxy = require('../proxy/student');

exports.homeworkEnsure = function (req, res, next) {
	if(typeof(req.query.subject) !== 'undefined' && req.query.subject){
		console.log(req.query.subject);
		var stu_id = req.cookies.stu_id
		if(typeof(stu_id) !== 'undefined' && stu_id){
			if(req.query.subject === 'math'){
				studentproxy.updateMathDoneById(stu_id, true, function (err) {
					if(err){
						return res.sendStatus(403);
					}
					res.redirect('/home/study');
				});
			}
			else if(req.query.subject === 'Chinese'){
				studentproxy.updateChineseDoneById(stu_id, true, function (err) {
					if(err){
						return res.sendStatus(403);
					}
					res.redirect('/home/study');
				});
			}
			else if(req.query.subject === 'English'){
				studentproxy.updateEnglishDoneById(stu_id, true, function (err) {
					if(err){
						return res.sendStatus(403);
					}
					res.redirect('/home/study');
				});
			}
			else{
				return res.sendStatus(403);
			}
		}
		else{
			return res.sendStatus(403);
		}
	}
	else{
		return res.sendStatus(403);
	}
}