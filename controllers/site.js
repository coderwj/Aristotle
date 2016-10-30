
var config       = require('../config');
var eventproxy   = require('eventproxy');


exports.index = function (req, res, next) {

  res.redirect('/signup');
};

