var REST = require(__dirname + "/../../../../../helpers/RESTHelper");

const express = require('express')
var public = module.exports = {};

public.initRouter = function (grpc) {

    let routeMap = [];

    let callBusSrv = true;
    var router = REST.initRouter("Layout", grpc, callBusSrv, routeMap);

    REST.barrier(router, []);

    router.route("/modules").get(function (req, res) {

        res.json([
            { name: "Sale", title: "Bán Hàng", path: "sale" },
            { name: "Purchase", title: "Mua Hàng", path: "purchase" },
            { name: "Shipment", title: "Giao Nhận", path: "shipment" },
            { name: "Inventory", title: " Kho ", path: "inventory" },
            { name: "PartnerBalance", title: "Công Nợ", path: "partnerbalance" },
            { name: "Expense", title: "Chi Phí", path: "expense" },
            { name: "Configure", title: "Cấu Hình", path: "config" }
        ])
    });


    router.route("/screens").get(function (req, res) {

        let module = req.query.module;

        if (module == "sale") {
            res.json([
                { name: "SaleOrder", title: "Bán Hàng Theo Đơn Hàng", path: "saleorder" },
                { name: "CashSale", title: "Bán Hàng Thu Tiền Ngay", path: "cashsale" },
                { name: "POS", title: "Bán Hàng Tại Cửa Hàng", path: "pos" }
            ])
        } else
            if (module == "purchase") {
                res.json([
                    { name: "PurchaseOrder", title: "Mua Hàng", path: "purchaseorder" }
                ])
            }
    });
    return router;
};

