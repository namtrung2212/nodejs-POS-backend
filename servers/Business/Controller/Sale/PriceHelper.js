
var BaseController = require("../../../../helpers/BaseController");
var DAL = require("../../../../helpers/MySQLHelper");
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var Redis = require("../../../../helpers/RedisHelper");
var grpc = require("../../../../grpc/grpcClient");

var Business = require("../Organization/Business");
var Numbering = require("../Configure/Numbering");

var Item = require("../Item/Item");
var Customer = require("../Partner/Customer");

var PriceList = require("./SalePriceList");
var Promotion = require("./SalePromotion");

var public = module.exports = {};
var private = {
};


public.getByItem = async function (params) {

    let obj = params;

    let price = await PriceList.getByItem(obj);
    if (!price) return price;
    console.log("price = " + JSON.stringify(price));

    let promotion = await Promotion.getByItem(obj);
    if (!promotion) return price;
    console.log("promotion = " + JSON.stringify(promotion));

    price.discpct = promotion.discpct;
    price.amount = price.unitprice * (1 + price.VATpct) * (1 - price.discpct);
    return price;
}

