
module.exports = exports;

exports.response = function (res, result) {

    if(result != null && result.result != null && result.result != "")
        result.result = JSON.parse(result.result);
        
    res.json(result)
};

