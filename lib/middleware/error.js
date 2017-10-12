var Log = require('log')
    , log = new Log('info');

module.exports = function (err, req, res, next) {
    log.error({err: err}, 'An error occured')
    if (err && err.message) {
        return res.status(400).json({
            error: err.message
        });
    } else if (err) {
        return res.status(400).json({
            error: err
        });
    } else {
        return res.status(500).json({
            error: 'Interval Server Error'
        });
    }
}