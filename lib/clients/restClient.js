var request = require('supertest-as-promised')
exports.getUrl = function (config) {
    return config.get('protocol') + '://' + config.get('host') + ':' + config.get('port')
}

exports.apiDiscrepancy = function (url, fileA, fileB) {
    var req = request(url)
        .post('/api/discrepancy')
    if (fileA) {
        req = req.attach('jsonCompanyA', fileA)
    }
    if (fileB) {
        req = req.attach('jsonCompanyB', fileB)
    }
    return req
}
