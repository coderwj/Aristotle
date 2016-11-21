var models  = require('../models');
var Answer    = models.Answer;

exports.newAnswer = function (content, q_id, create_p_id, date, callback) {
  var answer = new Answer();
  answer.content = content;
  answer.q_id = q_id;
  answer.create_p_id = create_p_id;
  answer.date = date;
  answer.save(callback);
};

exports.findAnswers = function (q_id, callback) {
	Answer.find({q_id: q_id}, null, {sort: '-date'}, callback);
}