
const express = require('express')
var public = module.exports = {};

public.getRouter = function () {

    var router = express.Router();
    router.route("/").get(function (req, res) {

        res.json("this is Expense")
    });

    return router;
};

