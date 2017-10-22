var config = {}


config.Secret='LoveOfMyLife'; 
config.Databases = [
    {Type : "system" ,No : "sys" , Address : "localhost/system"},
    {Type : "business" ,No : "bus1" , Address : "localhost/business1"},
    {Type : "business" ,No : "bus2" , Address : "localhost/business2"},
    {Type : "business" ,No : "bus3" , Address : "localhost/business3"},
    {Type : "social" ,No : "sc1" , Address : "localhost/social1"},
    {Type : "social" ,No : "sc2" , Address : "localhost/social2"},
    {Type : "social" ,No : "sc3" , Address : "localhost/social3"}
];


config.APINodePort = "3005";
config.SystemNodeLocalAdr = "0.0.0.0:30252";
config.SystemNodeExternalAdr = "localhost:30252";

config.BusinessNodes = [
    {Index : 1 , ExternalAdr : "127.0.0.1:3001", LocalAdr : "0.0.0.0:3001", DBNo : "bus1" },
    {Index : 2 , ExternalAdr : "127.0.0.1:3002", LocalAdr : "0.0.0.0:3002", DBNo : "bus2" },
    {Index : 3 , ExternalAdr : "127.0.0.1:3003", LocalAdr : "0.0.0.0:3003", DBNo : "bus3" }
];


config.isSystemNode = 1;
config.isHTTPNode = 1;
config.isBusinessNode = 1;
config.BusinessNodeIndex = 1; 


config.getCurrentBusinessServer = function(){
    
    if(config.isBusinessNode == 1 && config.BusinessNodeIndex > 0 ){
      
        for (var i = 0; i < config.BusinessNodes.length; i++) {
            if(config.BusinessNodes[i].Index == config.BusinessNodeIndex){
                return config.BusinessNodes[i];
            }
          }
    }

    return null;
    
};
    

module.exports = config;
