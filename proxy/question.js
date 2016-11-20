var models  = require('../models');
var Question    = models.Question;

exports.newQuestion = function (id, title, content, create_p_id, date, callback) {
  var question = new Question();
  question.id = id;
  question.title = title;
  question.content = content;
  question.create_p_id = create_p_id;
  question.date = date;
  question.save(callback);
};

exports.findAllQuestion = function (callback) {
	Question.find({}, null, {sort: '-date'}, callback);
}