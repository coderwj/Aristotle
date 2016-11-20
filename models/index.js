var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../common/logger')

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./parent');
exports.Parent = mongoose.model('Parent');

require('./student');
exports.Student = mongoose.model('Student');

require('./teacher');
exports.Teacher = mongoose.model('Teacher');

require('./class');
exports.Class = mongoose.model('Class');

require('./question');
exports.Question = mongoose.model('Question');

require('./answer');
exports.Answer = mongoose.model('Answer');

require('./information');
exports.Information = mongoose.model('Information');
