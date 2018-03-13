
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var REST = require("../../../../helpers/RESTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {
    tablename: "Business",
    DBtype: "system"
};

ex.getone = async function (params) {
    return await grpc.execute(grpc.system, ex.tablename, "getone", params);
};

ex.getFromSession = async function (params) {

    var bus = null;
    if (params && (params.session) && (params.session.business))
        bus = await ex.Business.getone({ id: params.session.business });

    return bus;
};