
const express = require('express')
var exports = module.exports = {};

exports.getRouter = function(){
    
    var router  =   express.Router();
    router.route("/").get(function(req,res){
        
            res.json("this is Shipment")
    });
        
    return router;
};
    
    