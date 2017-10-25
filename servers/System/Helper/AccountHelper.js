
var DAL = require("../../../helpers/MySQLHelper");
var UUID = require("../../../helpers/UUIDHelper");
var JWT = require("../../../helpers/JWTHelper");
var Redis = require("../../../helpers/RedisHelper");
var PhoneHelper = require("../../../helpers/PhoneHelper");
var grpcHelper = require("../../../grpc/grpcClientHelper");

var OTP = require('otp');

var exports = module.exports = {};


exports.sendotp = function (phonenum, callback) {

    exports.isAccountExisted(phonenum, function (existed) {

        if (existed == false) {
            var otp = OTP({ secret: "trung" }).totp();
            Redis.set(phonenum, otp, 60 * 5, 0);
            PhoneHelper.sendSMS(phonenum, otp);

            grpcHelper.response("", { sent: true, phonenum: phonenum, otp: otp }, callback);

        } else {

            grpcHelper.response("Số điện thoại đã tồn tại", { sent: false }, callback);
        }

    })

};


exports.checkotp = function (phonenum, otp, callback) {

     Redis.get(phonenum).then(function (data) {

        if (data == otp) {

            var obj = { verified: true, phonenum: phonenum, register_token: JWT.createRegisteringToken() };
            grpcHelper.response("", obj, callback);

        } else {

            var obj = { verified: false, phonenum: phonenum };
            grpcHelper.response("", obj, callback);
        }
    })

};

exports.isAccountExisted = function (phonenum, callback) {

    var sql = DAL.genSelect().from("Account").where("phonenum = ?", phonenum).toString();

    DAL.run("srv_sys", sql, function (error, results, fields) {

        callback(error == null && results != null && results.length > 0);

    });

};

exports.register = function (user, callback) {

   
    var sql = DAL.genInsert().into("Account")
        .setFieldsRows([
            {
                id: UUID.createForSQL(),
                ...user,
                checksum: DAL.hash(user)
            }
        ])
        .toString();

    DAL.run("srv_sys", sql, function (error, results, fields) {

        if (!error)
            exports.login(user, callback)
        else
            grpcHelper.response(JSON.stringify(error), results, callback);

    });

};


exports.login = function (user, callback) {

    var sql = DAL.genSelect().from("Account")
        .field("hex(id)", "id")
        .field("name")
        .field("email")
        .field("phonenum")
        .where("phonenum = ?", user.phonenum)
        .where("password = ?", user.password)
        .toString();

    DAL.run("srv_sys", sql, function (error, results, fields) {

        var result = results.length > 0 ? results[0] : null;
        if (result)
            result.token = JWT.createToken(result);

        grpcHelper.response(JSON.stringify(error), results, callback);

    });

};

