var http = require("http");
var url = require("url");

function start(route, handlers) {
	function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname; 
        var querystring = url.parse(request.url, true).query;
        
        console.log("Request for " + pathname + " received.");
        
        request.addListener('data', function(data) {
            postData += data;
        });
                        
        request.addListener('end', function() {
           var routeData = new RouteData(
              response, 
              request, 
              handlers, 
              pathname,
              postData,
              querystring
            );
           route(routeData); 
        });
  	}

  	var app = http.createServer(onRequest);
    app.listen(process.env.PORT || 8888);
    
  	console.log("Server has started.");
}

function RouteData(response, request, handlers, pathname, postData, querystring) {
  this.response = response;
  this.request = request;
  this.handlers = handlers;
  this.pathname = pathname;
  this.postData = postData;
  this.querystring = querystring;
}

exports.start = start;