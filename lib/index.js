var config = require('./config');
var router = require('./routers/')(config);
var serverFactory = require('./servers/serverFactory')(config, router);
var server = serverFactory.create();
var processLauncher = require('./servers/processLauncher')(server, config);
processLauncher.launch();
