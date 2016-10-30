
var config = require('./config');
var path = require('path');
var express = require('express');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');
var webRouter = require('./web_router');
var errorPageMiddleware = require('./middlewares/error_page');

var errorhandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var logger = require('./common/logger');

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

// 静态文件目录
var staticDir = path.join(__dirname, 'public');

var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
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

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('Aristotle listening on port', config.port);
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
  });
}

module.exports = app;
