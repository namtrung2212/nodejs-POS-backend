
var public = {};

var jwt = require('jsonwebtoken');
var config = require("../config");

public.shorttermToken = function (data) {
    var token = jwt.sign({ data: data }, config.Secret, {
        expiresIn: 60 * 5
    });
    return token;

};


public.longtermToken = function (data) {
    var token = jwt.sign({ data: data }, config.Secret, {
        expiresIn: 60 * 60 * 24
    });
    return token;

};

public.verifyToken = async function (token) {

    return await new Promise((resolve, reject) => {

        jwt.verify(token, config.Secret, function (err, decoded) {
            resolve(err == null);
        });
    });
};

public.decodeToken = async function (token) {

    return await new Promise((resolve, reject) => {

        jwt.verify(token, config.Secret, function (err, decoded) {
            resolve(err == null ? decoded : null);
        });
    });
};


module.exports = public;