
var grpc = require('grpc');
var path = require("path");
const fs = require('fs');
var exports = module.exports = {};

exports.init = function (server, proto) {

    server.addService(proto.Sale.SaleOrderService.service, {
        getOrders: function (call, callback) {

            callback(null, { orders: [], res_at: new Date().getTime() });

        }
    });
};
