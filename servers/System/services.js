
var ex = module.exports = {};

ex.init = async function (dbConfig) {

    var DAL = require("../../helpers/MySQLHelper");
    await DAL.init();
    await DAL.connect(dbConfig);
    ex.DAL = DAL;
    ex.Redis = DAL.Redis;
    ex.Query = DAL.Query;

    var Base = require("../../helpers/BaseController");
    await Base.init(DAL);
    ex.Base = Base;

    ex.services = new Map();

    var Numbering = require("../../helpers/NumberingHelper");
    var Account = require("./Controller/Account");
    var Business = require("./Controller/Business");

    await ex.initService(Numbering, "Numbering");
    await ex.initService(Account, "Account");
    await ex.initService(Business, "Business");

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

        service.Base = ex.Base;
        service.DAL = ex.DAL;
        service.Redis = ex.Redis;
        service.Query = ex.Query;

        ex.Base[name] = service;
        ex.Query[name] = service;
        ex.DAL[name] = service;
    });

    return;
};

ex.get = async function (service) {
    return ex.services.get(service);
}

ex.handler = async function (call, cb) {

    let name = call.request.entity;

    let service = await ex.get(name);
    if (service)
        ex.server.onCalled(service.handler, call, cb);
};



