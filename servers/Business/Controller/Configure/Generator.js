
var UUID = require("../../../../helpers/UUIDHelper");
var JWT = require("../../../../helpers/JWTHelper");
var grpc = require("../../../../grpc/grpcClient");

var ex = module.exports = {};

ex.init = async function (dal) {

  ex.DAL = dal;
  ex.Redis = dal.Redis;
  ex.Query = dal.Query;

  return;
};

ex.genUserRoles = async function (bus) {

  var UserRole = ex.UserRole;

  if (bus.type == null || bus.type == "retail") {

    await UserRole.quickCreate(bus, {
      type: "saler",
      name: "saler",
      configFile: "retail_userrole_saler.json"
    });

    await UserRole.quickCreate(bus, {
      type: "cashier",
      name: "cashier",
      configFile: "retail_userrole_cashier.json"
    });

    await UserRole.quickCreate(bus, {
      type: "admin",
      name: "admin",
      configFile: "retail_userrole_admin.json"
    });

  }
  else if (bus.type == "fnb") {

    await UserRole.quickCreate(bus, {
      type: "saler",
      name: "saler",
      configFile: "fnb_userrole_saler.json"
    });

    await UserRole.quickCreate(bus, {
      type: "cashier",
      name: "cashier",
      configFile: "fnb_userrole_cashier.json"
    });

    await UserRole.quickCreate(bus, {
      type: "admin",
      name: "admin",
      configFile: "fnb_userrole_admin.json"
    });

  }

};

ex.genUsers = async function (bus, branch, store, warehouse) {

  var User = ex.User;
  var DAL = ex.DAL;

  await User.quickCreate(bus, branch, store, warehouse, {
    name: "banhang01",
    password: DAL.hash("banhang01", true),
    roles: "saler|cashier"
  });

  await User.quickCreate(bus, branch, store, warehouse, {
    name: "banhang02",
    password: DAL.hash("banhang02", true),
    roles: "saler|cashier"
  });

  await User.quickCreate(bus, branch, store, warehouse, {
    name: "admin",
    password: DAL.hash("Nirvana!@#", true),
    roles: "admin",
    linkacc: bus.owner
  });
};
ex.handler = async function (request) {

  var params = JSON.parse(request.params);
  if (request.method == "genOrganization") return await ex.genOrganization(params);

  return null;
};

ex.genOrganization = async function (bus) {

  var Numbering = ex.Numbering;
  var Branch = ex.Branch;
  var Store = ex.Store;
  var Warehouse = ex.Warehouse;

  await Numbering.tryCreateNumbering(bus.id, {
    Branch: "CN{N}",
    Store: "CH{N}",
    Warehouse: "Kho{N}",
    Employee: "NV{N}",
    Agent: "DL{N}",
    Customer: "KH{N}",
    Vendor: "NCC{N}",
    Item: "VT{N}",
    ItemGroup: "NVT{N}"
  });


  let branch = await Branch.quickCreate(bus, {
    name: "Chi nhánh 1"
  });

  console.log("branch - " + JSON.stringify(branch));

  let store = await Store.quickCreate(bus, branch, {
    name: "Cửa hàng 1"
  });

  console.log("store - " + JSON.stringify(store));

  let warehouse = await Warehouse.quickCreate(bus, branch, store, {
    name: "Kho hàng 1"
  });

  console.log("warehouse - " + JSON.stringify(warehouse));

  await ex.genUserRoles(bus);
  await ex.genUsers(bus, branch, store, warehouse);
  return bus;
};

