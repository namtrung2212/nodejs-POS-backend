
var ex = module.exports = {};

ex.connectDB = async function (dbConfig) {
    await DAL.connect(dbConfig);
};

ex.init = async function () {

    var DAL = require("../../helpers/MySQLHelper");
    await DAL.init();
    ex.DAL = DAL;
    ex.Redis = DAL.Redis;
    ex.Query = DAL.Query;

    var Base = require("../../helpers/BaseController");
    await Base.init(DAL);
    ex.Base = Base;

    ex.services = new Map();

    var Numbering = require("../../helpers/NumberingHelper");
    var Configure = require("./Controller/Configure/Configure");
    var Generator = require("./Controller/Configure/Generator");
    var Permission = require("./Controller/Configure/Permission");

    var Business = require("./Controller/Organization/Business");
    var Branch = require("./Controller/Organization/Branch");
    var Employee = require("./Controller/Organization/Employee");
    var Store = require("./Controller/Organization/Store");
    var Warehouse = require("./Controller/Organization/Warehouse");
    var User = require("./Controller/Organization/User");
    var UserRole = require("./Controller/Organization/UserRole");

    var Agent = require("./Controller/Partner/Agent");
    var Customer = require("./Controller/Partner/Customer");
    var Vendor = require("./Controller/Partner/Vendor");
    var ParnerBalance = require("./Controller/Partner/PartnerBalance");

    var Item = require("./Controller/Item/Item");
    var ItemGroup = require("./Controller/Item/ItemGroup");

    var SaleMenu = require("./Controller/Sale/SaleMenu");
    var SalePriceList = require("./Controller/Sale/SalePriceList");

    await ex.initService(Numbering, "Numbering");

    await ex.initService(Configure, "Configure");
    await ex.initService(Generator, "Generator");
    await ex.initService(Permission, "Permission");

    await ex.initService(Business, "Business");
    await ex.initService(Branch, "Branch");
    await ex.initService(Employee, "Employee");
    await ex.initService(Store, "Store");
    await ex.initService(Warehouse, "Warehouse");
    await ex.initService(User, "User");
    await ex.initService(UserRole, "UserRole");

    await ex.initService(Agent, "Agent");
    await ex.initService(Customer, "Customer");
    await ex.initService(Vendor, "Vendor");
    await ex.initService(ParnerBalance, "ParnerBalance");

    await ex.initService(Item, "Item");
    await ex.initService(ItemGroup, "ItemGroup");

    await ex.initService(SaleMenu, "SaleMenu");
    await ex.initService(SalePriceList, "SalePriceList");

    await ex.applyRelations();

    return;
};


ex.initService = async function (service, name) {

    ex.services.set(name, service);

    service.Base = ex.Base;
    service.DAL = ex.DAL;
    service.Redis = ex.Redis;
    service.Query = ex.Query;

    ex[name] = service;

    ex.Base[name] = service;
    ex.Query[name] = service;
    ex.DAL[name] = service;

    return;
};

ex.applyRelations = async function () {

    ex.services.forEach(function (service, name, m1) {

        ex.services.forEach(function (otherSerice, otherName, m2) {

            service[otherName] = otherSerice;

        });

        ex.Base[name] = service;
        ex.Query[name] = service;
        ex.DAL[name] = service;

        service.Base = ex.Base;
        service.DAL = ex.DAL;
        service.Redis = ex.Redis;
        service.Query = ex.Query;
    });

    return;
};

ex.get = async function (service) {
    return ex.services.get(service);
};

ex.handler = async function (call, cb) {

    let name = call.request.entity;

    let service = await ex.get(name);
    if (service)
        ex.server.onCalled(service.handler, call, cb);
};



