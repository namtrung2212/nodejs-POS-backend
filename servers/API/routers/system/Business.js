var REST = require(__dirname + "/../../../../helpers/RESTHelper");

const express = require('express')
var public = module.exports = {};

public.initRouter = function (grpc) {

    let routeMap = [
        { method: "get", secure: false, route: "isCodeExisted" },
    ];

    let callBusSrv = false;
    return REST.initRouter("Business", grpc, callBusSrv, routeMap);

    return router;
};

