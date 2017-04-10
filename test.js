var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://mmolash:*7rash*7@ds061621.mongolab.com:61621/csgoscores";

MongoClient.connect(uri, function(err, db) {
        if (err) {
            return console.dir(err);
        }
        
        var collection = db.collection('regids');
        collection.insert(
            { regid:3234234, 
             teams:["c9"], 
             notifications:{
                 start:true, 
                 half:false, 
                 end:true 
             }
            }, function(err, docs) {
            db.close();   
        });
    });