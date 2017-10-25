

var jwt = require('jsonwebtoken');
var config = require("../config");
var exports = module.exports = {};


exports.createRegisteringToken = function () {
    var token = jwt.sign({data: config.Secret}, config.Secret, {
        expiresIn: 60*60*24
    });
    return token;

};


exports.createToken = function (user) {
    var token = jwt.sign({data: user}, config.Secret, {
        expiresIn: 60*60*24
    });
    return token;

};

exports.verifyToken = function (token) {
    return jwt.verify(token, config.Secret);

};