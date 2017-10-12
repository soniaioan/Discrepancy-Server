
module.exports = function (discrepancyService, utils) {
    var Promise = require('bluebird');
    var Log = require('log')
        , log = new Log('info');
    return {
        checkDiscrepancy: function (req, res, next) {
            var companyFileA;
            var companyFileB;
            return Promise.resolve().then(function () {
                if (!(req.files)){
                    throw (new Error('files are missing'));
                }
                if (!req.files['jsonCompanyA'] || !req.files['jsonCompanyB']) {
                    throw (new Error('files are missing'));
                }
                companyFileA = req.files['jsonCompanyA'][0];
                companyFileB = req.files['jsonCompanyB'][0];
                return utils.extractJsonFromFile(companyFileA).then(function (result) {
                    var companyDataA;
                    var companyDataB;
                    companyDataA = result;
                    return utils.extractJsonFromFile(companyFileB).then(function (result) {
                        companyDataB = result;
                        return discrepancyService.findAnyDiscrepancies(companyDataA, companyDataB);
                    })
                })
            }).then(function (result) {
                log.info({response: JSON.stringify(result)});
                res.status(200).json(result);
            }).catch(next)
        }
    }
}
