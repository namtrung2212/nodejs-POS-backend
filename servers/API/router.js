
const express = require('express')
var exports = module.exports = {};

var SaleRouter = require("./routers/Sale")
var PurchaseRouter = require("./routers/Purchase")
var ShipmentRouter = require("./routers/Shipment")
var InventoryRouter = require("./routers/Inventory")
var BalanceRouter = require("./routers/PartnerBalance")
var ExpenseRouter = require("./routers/Expense")
var OrganizationRouter = require("./routers/Organization")
var ConfigureRouter = require("./routers/Configure")
var AuthenRouter = require("./routers/Authentication")
var LayoutRouter = require("./routers/Layout")

exports.load = function(grpcClient){
    
    var router      =   express.Router();
    
    router.use('/sale', SaleRouter.getRouter(grpcClient));
    router.use('/purchase', PurchaseRouter.getRouter(grpcClient));
    router.use('/shipment', ShipmentRouter.getRouter(grpcClient));
    router.use('/inventory', InventoryRouter.getRouter(grpcClient));
    router.use('/balance', BalanceRouter.getRouter(grpcClient));
    router.use('/expense', ExpenseRouter.getRouter(grpcClient));
    router.use('/organization', OrganizationRouter.getRouter(grpcClient));
    router.use('/configure', ConfigureRouter.getRouter(grpcClient));
    router.use('/authen', AuthenRouter.getRouter(grpcClient));
    router.use('/layout', LayoutRouter.getRouter(grpcClient));

    return router;
};
    
    