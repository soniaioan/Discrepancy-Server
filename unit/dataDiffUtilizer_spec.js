var should = require('should')
describe('Data Diff Utilizer: Module which takes as input two arrays with data objects(timestamp, spend, impressions ) and a ' +
    'percentage as float', function () {
    describe('Computes the diffs between the objects of the datasets and if the discrepancy diff in spend or impressions is higher than percentage' +
        'it adds it to output. Output is an array with the hour strings that at least one diff found in metrics', function () {
        it('Should return an empty array if the below datasets are given as input (datasets are exactly the same)', function () {
            var dataA = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 11,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1360,
                    "spend": 30.65
                }
            ];
            var dataB = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 11,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1360,
                    "spend": 30.65
                }
            ]
        var dataDiffUtilizer = require('../lib/dataDiff/dataDiffUtilizer');
        var result = dataDiffUtilizer.computeDataDiffs(dataA, dataB, 0.05)
        result.length.should.eql(0)
        })
        it('Should return an array filled in with the hour timestamps that we had diff(datasets differ - check impressions metric)', function () {
            var dataA = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 0,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1360,
                    "spend": 30.65
                }
            ];
            var dataB = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 11,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1360,
                    "spend": 30.65
                }
            ]
            var dataDiffUtilizer = require('../lib/dataDiff/dataDiffUtilizer');
            var result = dataDiffUtilizer.computeDataDiffs(dataA, dataB, 0.05)
            result.length.should.eql(1)
        })
        it('Should return an empty array since the diff is lower than the minimum percentage - check impressions value on second objects', function () {
            var dataA = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 11,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1340,
                    "spend": 30.53
                }
            ];
            var dataB = [{
                "timestamp": "2016-08-05T19:00:00",
                "impressions": 11,
                "spend": 37.56
            },
                {
                    "timestamp": "2016-08-05T20:00:00",
                    "impressions": 1362,
                    "spend": 30.64
                }
            ]
            var dataDiffUtilizer = require('../lib/dataDiff/dataDiffUtilizer');
            var result = dataDiffUtilizer.computeDataDiffs(dataA, dataB, 0.05)
            result.length.should.eql(0)
        })
    })
})
