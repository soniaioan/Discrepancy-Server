var constants = require('../constants')
module.exports = function (dataDiffUtilizer) {
    return {
        findAnyDiscrepancies: function (data1, data2) {
            return dataDiffUtilizer.computeDataDiffs(data1, data2, constants.DISCR_MIN)
        }
    }
}
