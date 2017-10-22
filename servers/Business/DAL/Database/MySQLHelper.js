
var mysql = require('mysql');
var exports = module.exports = {};

var businesPool = null;

exports.connect = function(){
        
        if(businesPool)
            return businesPool;

        businesPool  = mysql.createPool({
            connectionLimit : 10,
            host            : 'localhost',
            user            : 'root',
            password        : 'Nirvana!@#'
        });
  
        return businesPool;
};