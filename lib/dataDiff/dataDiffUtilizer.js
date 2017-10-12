var diff = require('deep-diff')
var _ = require('lodash')
var BigNumber = require('bignumber.js');
BigNumber.config({ DECIMAL_PLACES: 20, ROUNDING_MODE: 5, ERRORS: false })

exports.computeDataDiffs = function computeDataDiffs (arrA, arrB, floatPercentage) {
    /**
     * |x1-x2|/(x1+x2)/2
     * @param value1
     * @param value2
     */

    function discrepancyCalculator (value1, value2) {
        var x1 = new BigNumber((value1).toString());
        var x2 = new BigNumber((value2).toString());
        var subX =  x1.minus(x2);
        var addX = (x1.plus(x2)).dividedBy(2);
        var result = subX.dividedBy(addX);
        var resultRound = new BigNumber(result.abs()).round(2, BigNumber.ROUND_HALF_EVEN);
        return resultRound;
    };
    function parseDocDiffs (diffs) {
        var arr = [];
        diffs.map(function (element) {
            if (element.kind === 'E') {
                if (discrepancyCalculator(element.lhs, element.rhs).greaterThan(floatPercentage)) {
                    arr.push(arrA[element.path[0]].timestamp);
                }
            }
        })
        return _.uniq(arr);
    }
    var diffs = diff(arrA, arrB);
    if (diffs === undefined) {
        return [];
    }
    return parseDocDiffs(diffs);
}
