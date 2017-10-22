
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

        // check user existing by phonenumber
        // generate otp in redis (key is phonenumber)
        // send otp to user phone

    });

    router.route("/sendotp").get(function (req, res) {

        // check user existing by phonenumber
        // generate otp in redis (key is phonenumber)
        // send otp to user phone

    });

    router.route("/checkotp").get(function (req, res) {

        // check otp in redis
        // return register-token

    });

    router.route("/register").get(function (req, res) {

        // validate register-token
        // create user
        // return 

    });

    return router;
};

