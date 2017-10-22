
const express = require('express')
var exports = module.exports = {};


exports.genUserToken = function (userid) {

    var token = {}
    return token;
};

exports.genCompanyToken = function (userid, companyid) {

    var token = {}
    return token;
};


exports.isExpired = function (token) {

    return false;
};

exports.getUserId = function (token) {

    return null;
};

exports.getCompanyId = function (token) {

    return null;
};

exports.getDBNum = function (token) {

    return 1;
};

var jwt = require('jsonwebtoken');
var config = require("../config");
const fs = require('fs');
var exports = module.exports = {};

exports.tokenForRegister = function (user) {

    var token = jwt.sign(user, config.superSecret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

};
