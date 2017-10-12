var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'));

exports.extractJsonFromFile = function extractJsonFromFile (file) {
    if (!file) {
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
        fs.readFile(file.path, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
}

