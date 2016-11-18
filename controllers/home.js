//sign up
exports.showHome = function (req, res) {
	console.log(req.cookies.id)
  	res.redirect('/home/user');
};

exports.showUser = function (req, res) {
  	res.render('home/user');
};

exports.showStudy = function (req, res) {
  	res.render('home/study');
};

exports.showCommunity = function (req, res) {
  	res.render('home/community');
};

exports.showBbs = function (req, res) {
  	res.render('home/bbs');
};

exports.showInfo = function (req, res) {
  	res.render('home/info');
};

exports.Quit = function (req, res) {
  	res.render('signin', { info: '注销成功' });
};