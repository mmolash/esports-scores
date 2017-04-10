var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mongodb = require('mongodb');

var handlers={};
handlers["/"]=requestHandlers.upcomingMathces;
handlers["/upcomingMatches"]=requestHandlers.upcomingMatches;
handlers["/previousMatches"]=requestHandlers.previousMatches;
handlers["/currentMatches"]=requestHandlers.currentMatches;
handlers["/register"]=requestHandlers.register;

var uri = "mongodb://mmolash:*7rash*7@ds061621.mongolab.com:61621/csgoscores";

server.start(router.route, handlers);