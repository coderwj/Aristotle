var models  = require('../models');
var Information    = models.Information;

exports.newInformation = function (id, title, content, create_t_id, date, class_id, callback) {
  var information = new Information();
  information.id = id;
  information.title = title;
  information.content = content;
  information.create_t_id = create_t_id;
  information.date = date;
  information.class_id = class_id;
  information.save(callback);
};

exports.findAllInformation = function (callback) {
	Information.find({}, null, {sort: '-date'}, callback);
}