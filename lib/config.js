var nconf = require('nconf');
var env = process.env.NODE_ENV
var configPath = './lib/config/' + env + '.json';
nconf.argv()
    .env()
    .file('global', { file: configPath });
module.exports = nconf;
