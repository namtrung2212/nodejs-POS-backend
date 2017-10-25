var restful = require("../../../helpers/RESTHelper");
const express = require('express')
var exports = module.exports = {};

exports.getRouter = function (grpcClient) {

    var router = express.Router();
    // router.route("/").get(function(req,res){

    //         grpcClient.SystemClient.AuthenService.getUsers({}, function(error, result) {

    //             res.json(result)

    //         });

    // });

    router.route("/sendotp").get(function (req, res) {

        var params = { phonenum: req.query.phonenum };

        grpcClient.SystemClient.AuthenService.sendotp({ params: JSON.stringify(params), req_at: new Date().getTime() }, function (error, result) {

            restful.response(res, result);

        });

    });

    router.route("/checkotp").get(function (req, res) {

        var params = { 
            phonenum: req.query.phonenum,
            otp: req.query.otp
         };

        grpcClient.SystemClient.AuthenService.checkotp({ params: JSON.stringify(params), req_at: new Date().getTime() }, function (error, result) {

            restful.response(res, result);

        });

    });

    router.route("/register").post(function (req, res) {

        var params = { 
            bearing: req.headers.bearing,
            user : {...req.body}
         };

        grpcClient.SystemClient.AuthenService.register({ params: JSON.stringify(params), req_at: new Date().getTime() }, function (error, result) {

            restful.response(res, result);

        });
    });

    router.route("/login").post(function (req, res) {

        grpcClient.SystemClient.AuthenService.login({ params: JSON.stringify(req.body), req_at: new Date().getTime() }, function (error, result) {

            restful.response(res, result);

        });
    });
    return router;
};

