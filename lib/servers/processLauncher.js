module.exports = function (appServer, config) {
    var Log = require('log')
        , log = new Log('info');
    return {
        launch: function () {
            var cluster = require('cluster');
            var os = require('os');
            if (!config.get('cluster_mode') || !cluster.isMaster) {
                appServer.listen(appServer.get('port'), function () {
                    log.info('Host: ' + os.hostname() + ', Process id: ' + process.pid)
                    log.info('Express server listening on port ' + appServer.get('port'));
                });
                return;
            }
            var clusterNodes = config.get('cluster_nodes');
            log.info('Starting cluster with ' + clusterNodes + ' workers');
            for (var i = 0; i < clusterNodes; i += 1) {
                var worker = cluster.fork();
                log.info('Worker ' + worker.process.pid + ' started.');
            }
            cluster.on('exit', function (worker, code, signal) {
                log.info('------------------------------------------------------------');
                log.info('Host: ' + os.hostname() + ' Pid:' + worker.process.pid + ' EXIT. Code: ' + code + ' Signal:' + signal + ' Restarting ...');
                cluster.fork();
            });
        }
    }
}
