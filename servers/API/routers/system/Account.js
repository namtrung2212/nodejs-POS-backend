var REST = require(__dirname + "/../../../../helpers/RESTHelper");

const express = require('express')
var public = module.exports = {};

public.initRouter = function (grpc) {

    let routeMap = [
        { method: "get", secure: false, route: "sendotp" },
        { method: "get", secure: false, route: "verifyotp" },
        { method: "post", secure: false, route: "login" },
        { method: "get", secure: false, route: "sendforgotpasswordotp" },
        { method: "get", secure: false, route: "verifyforgotpasswordotp" },
        { method: "post", secure: true, route: "changepassword" },
    ];

    let callBusSrv = false;
    return REST.initRouter("Account", grpc, callBusSrv, routeMap);

    return router;
};

