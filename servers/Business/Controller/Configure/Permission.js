
var DAL = require("../../../../helpers/MySQLHelper");
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var Redis = require("../../../../helpers/RedisHelper");
var grpc = require("../../../../grpc/grpcClient");

var Business = require("../Organization/Business");
var User = require("../Organization/User");
var UserRole = require("../Organization/UserRole");

var public = module.exports = {};
var private = {

    getUserRoles: async function (user) {

        return new Promise(resolve => {

            let jobs = user.role.split('|').map(role => UserRole.getByName(user.business, role));

            Promise.all(jobs).then(values => {
                resolve(values);
            });

        });
    }
};

public.getByUser = async function (userId) {

    let user = await User.getone({ id: userId });
    let bus = await Business.getone({ id: user.business });
    let roles = await private.getUserRoles(user);
    let busConfig = bus.config;

    var perm = {
        useSaleModule: bus.config.useSaleModule,
        usePurchaseModule: bus.config.usePurchaseModule
    };

    roles.forEach(function (role) {

        perm.useSaleModule = perm.useSaleModule || role.useSaleModule;
        perm.usePurchaseModule = perm.usePurchaseModule || role.usePurchaseModule;

    }, this);


    return perm;
};

