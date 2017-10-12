require('../lib/index')
require('assert')
var config = require('../lib/config')
var restClient = require('../lib/clients/restClient')
var url = restClient.getUrl(config)
var should = require('should')

describe('Discrepancy Api', function () {
    describe('Given a request with attached the 2 json key files from 2 different companies, api endpoint should return an array with the hours', function () {
        it('Should return 200 an array filled in with hour timestamps if differences were found', function () {
            return restClient.apiDiscrepancy(url, 'fixtures/fail/JsonA.json', 'fixtures/fail/JsonBDiscr.json').then(function (res) {
                should(res.statusCode).eql(200);
                // result =2
                res.body.length.should.not.eql(0);
            console.log(res.body)
            }).catch(function(err){
                    console.log(err);
            })
        })
        it('Should return 200 and an empty array if no differences were found', function () {
            return restClient.apiDiscrepancy(url, 'fixtures/success/JsonA.json', 'fixtures/success/JsonBNoDiscr.json').then(function (res) {
                should(res.statusCode).eql(200);
                res.body.length.should.eql(0);
            }).catch(function(err){
                console.log(err);
            })
        })
        it('Should return 400 if data files are missing from request', function () {
            return restClient.apiDiscrepancy(url,null, null).then(function (res) {
                should(res.statusCode).eql(400);
            }).catch(function(err){
                console.log(err);
            })
        })
        it('Should return 400 if one file is attached while the other is missing', function () {
            return restClient.apiDiscrepancy(url,null, 'fixtures/success/JsonBNoDiscr.json').then(function (res) {
                should(res.statusCode).eql(400);
            }).catch(function(err){
                console.log(err);
            })
        })
    })
})
