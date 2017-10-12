module.exports = function (config, router) {
    var Log = require('log')
        , log = new Log('info');
    var error = require('../middleware/error')
    return {
        create: function () {
            var express = require('express');
            var bodyParser = require('body-parser');
            var app = express();
            log.info('*********************************************************************')
            log.info('Discrepancy API Endpoint version started!')
            app.set('port', config.get('port'));
            app.use(bodyParser.json({
                limit: '10mb'
            }));
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            var path = require('path')
            app.set('views', path.join(__dirname, '/../../views'))
            app.use('/', router);
            app.use(error);
            app.use(function (req, res, next) {
                res.status(404);
                log.error({err: {name: 'NotFound', url: req.url}}, 'Not found URL: ' + req.url);
                return res.render('404.ejs');
            });
            return app;
        }
    }
}
