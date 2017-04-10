var ggMatches = require('gosugamers-matches');

function upcomingMatches (RouteData) {
  ggMatches.parseUpcomingPage(1, 'counterstrike', function(err, data) {
    if (err) {
      throw error;
    } else {
      RouteData.response.write(JSON.stringify(data));
      RouteData.response.end();
    }
  });
}

function currentMatches (RouteData) {
  ggMatches.parseCurrentPage(1, 'counterstrike', function(err, data) {
    if (err) {
      throw error;
    } else {
      RouteData.response.write(JSON.stringify(data));
      RouteData.response.end();
    }
  });
}

function previousMatches (RouteData) {
  ggMatches.parseMatchPage(1, 'counterstrike', function(err, data) {
    if (err) {
      throw error;
    } else {
      RouteData.response.write(JSON.stringify(data));
      RouteData.response.end();
    }
  });
}

exports.upcomingMatches = upcomingMatches;
exports.previousMatches = previousMatches;
exports.currentMatches = currentMatches;
