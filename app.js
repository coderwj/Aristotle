
var config = require('./config');
var path = require('path');
var express = require('express');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');
var webRouter = require('./web_router');
var errorPageMiddleware = require('./middlewares/error_page');
var bodyParser = require('body-parser');

var errorhandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var logger = require('./common/logger');

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

// 静态文件目录
var staticDir = path.join(__dirname, 'public');

var app = express();

// http body 设置，url 设置
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
//app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');


// Request logger。请求时间
app.use(requestLog);


// 静态资源
app.use('/public', express.static(staticDir));

app.use(errorPageMiddleware.errorPage);

app.use('/', webRouter);

// error handler
if (config.debug) {
  app.use(errorhandler());
} else {
  app.use(function (err, req, res, next) {
    logger.error(err);
    return res.status(500).send('500 status');
  });
}

if (config.reinit) {
	var init = require('./init');
	init.reinit(config.reset_parent);
}

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('Aristotle listening on port', config.port);
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
  });
}

module.exports = app;
