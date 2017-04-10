var static = require("node-static");
var fileServer = new(static.Server)('./public');

function route(RouteData) {
	console.log("About to route a request for " + RouteData.pathname);
	var handler = RouteData.handlers[RouteData.pathname];
	if (typeof handler === 'function') {
		handler(RouteData);
	} else {
		console.log("Loading page");
		fileServer.serve(RouteData.request, RouteData.response, function(err, result) {
			if(err) {
				console.log("Error serving page");
				RouteData.response.end();
			}
		});
	}
}

exports.route = route;
