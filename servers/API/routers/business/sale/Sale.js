
const express = require('express')
var public = module.exports = {};

public.getRouter = function (grpcClient) {

    var router = express.Router();
    router.route("/").get(function (req, res) {

        grpcClient.BusinessClients.get("bus1").SaleOrderService.getOrders({}, function (error, result) {

            res.json(result)

        });
    });

    // router.route("/create").get(function(req,res){

    //        var order = req.body.saleorder;

    //        order.main
    //        order.items 

    //        var error = recalculate(order) // order.items => order.main 


    //     order => mysql.create(SaleOrder)


    // });


    // router.route("/update").get(function(req,res){

    //        var order = req.body.saleorder;

    //        order.main
    //        order.items 

    //        var error = recalculate(order) // order.items => order.main 


    //     order => mysql.update(SaleOrder)


    // });


    // router.route("/get").get(function(req,res){


    //     mysql.select("SaleOrder",orderid) => json.order

    //     return json;


    // });



    // router.route("/createShipment").get(function(req,res){


    //     order = mysql.select("SaleOrder",orderid) 

    //     order.main => mysql.create("Invoice")

    //     order.items.foreach(item => {

    //         mysql.create("InvoiceItem",item)
    //         item.InvoicedQty = item.Qty;

    //      })
    //     //Invoice never changed

    // });


    // router.route("/createInvoice").get(function(req,res){


    //     order = mysql.select("SaleOrder",orderid) 

    //     order.main => mysql.create("Invoice")

    //     order.items.foreach(item => {

    //         mysql.create("InvoiceItem",item)
    //         item.InvoicedQty = item.Qty;

    //      })
    //     //Invoice never changed

    // });


    return router;
};

