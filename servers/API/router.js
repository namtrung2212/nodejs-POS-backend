
const express = require('express');
var public = module.exports = {};

var REST = require(__dirname + "/../../helpers/RESTHelper");

var Account = require("./routers/system/Account");
var Business = require("./routers/system/Business");
var User = require("./routers/business/organization/User");

public.load = function (grpc) {

    var router = express.Router();

    router.use('/account', Account.initRouter(grpc));
    router.use('/business', Business.initRouter(grpc));

    router.use('/configure', REST.initRouter("Configure", grpc, true));
    router.use('/generator', REST.initRouter("Generator", grpc, true));
    router.use('/permission', REST.initRouter("Permission", grpc, true));

    router.use('/branch', REST.initRouter("Branch", grpc, true));
    router.use('/employee', REST.initRouter("Employee", grpc, true));
    router.use('/store', REST.initRouter("Store", grpc, true));
    router.use('/warehouse', REST.initRouter("Warehouse", grpc, true));
    router.use('/user', User.initRouter(grpc));

    router.use('/agent', REST.initRouter("Agent", grpc, true));
    router.use('/customer', REST.initRouter("Customer", grpc, true));
    router.use('/vendor', REST.initRouter("Vendor", grpc, true));
    router.use('/partnerbalance', REST.initRouter("Partnerbalance", grpc, true));

    router.use('/item', REST.initRouter("Item", grpc, true));
    router.use('/itemgroup', REST.initRouter("ItemGroup", grpc, true));

    router.use('/sale/menu', REST.initRouter("SaleMenu", grpc, true));
    router.use('/sale/pricelist', REST.initRouter("SalePriceList", grpc, true));

    return router;
};

