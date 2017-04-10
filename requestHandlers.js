var matchScraper = require('./matchScraper');
var MongoClient = require('mongodb').MongoClient;

var uri = "";

function upcomingMatches(RouteData) {
    console.log("Request handler 'matchScraper' was called....");
    RouteData.response.writeHead(200, {'Content-Type': 'text/json'});
	matchScraper.upcomingMatches(RouteData);
}

function previousMatches(RouteData) {
	console.log("Request handler 'matchScraper' was called....");
	RouteData.response.writeHead(200, {'Content-Type': 'text/json'});
	matchScraper.previousMatches(RouteData);
}

function currentMatches(RouteData) {
	console.log("Request handler 'matchScraper' was called....");
	RouteData.response.writeHead(200, {'Content-Type': 'text/json'});
	matchScraper.currentMatches(RouteData);
}

function register(RouteData) {
    console.log("Request handler 'register' was called....");
    var registrationData = JSON.parse(RouteData.postData);
    
    MongoClient.connect(uri, function(err, db) {
        if (err) {
            return console.dir(err);
        }
        
        var collection = db.collection('regids');
        collection.insert(
            { regid:registrationData.regId }, function(err, docs) {
            db.close();   
        });
    });
}

exports.upcomingMatches = upcomingMatches;
exports.previousMatches = previousMatches;
exports.currentMatches = currentMatches;
exports.register = register;
