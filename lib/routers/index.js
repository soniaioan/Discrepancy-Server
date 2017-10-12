
module.exports = function (config) {
    var express = require('express');
    var multer = require('multer');
    var router = express.Router();
    var utils = require('../utils');
    var dataDiffUtilizer = require('../dataDiff/dataDiffUtilizer');
    var discrepancyService = require ('../service/discrepancyService')(dataDiffUtilizer);
    var discrepancyController = require('../controllers/discrepancyController')(discrepancyService, utils);

    var storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now())
        }
    })
    var upload = multer({storage: storage})
    var cpUpload = upload.fields([
        {name: 'jsonCompanyA', maxCount: 1},
        {name: 'jsonCompanyB', maxCount: 1}
    ])
    router.post('/api/discrepancy', cpUpload, discrepancyController.checkDiscrepancy)
    router.get('/api', function (req, res) {
        res.send('Discrepancy Server is running');
    })
    return router;
}