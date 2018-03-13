var REST = require(__dirname + "/../../../../../helpers/RESTHelper");

const express = require('express')
var public = module.exports = {};

public.initRouter = function (grpc) {

    let routeMap = [];

    let callBusSrv = true;
    var router = REST.initRouter("PartnerBalance", grpc, callBusSrv, routeMap);

    REST.barrier(router, []);

    return router;
};
