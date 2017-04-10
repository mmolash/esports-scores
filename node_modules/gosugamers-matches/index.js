var cheerio = require('cheerio');
var hyperquest = require('hyperquest');
var concat = require('concat-stream');
var parseMatch = require('gosugamers-match');
var eachAsync = require('each-async');

var BASE_URL = 'http://www.gosugamers.net';

function parseMatchPage(page, game, callback) {
  var matchlist = {};
  matchlist.data = [];

  var stream = hyperquest(BASE_URL + '/' + game + '/gosubet?r-page=' + page);

  stream.on('error', callback);

  stream.pipe(concat(function(data) {
    var $ = cheerio.load(data);
    var recent = $('table.simple.matches').last();

    var matches = $('a.match', recent);

    var links = [];
    matches.each(function(i, el) {
      links[i] = BASE_URL + $(el).attr('href');
    });

    eachAsync(links, function(link, i, done) {
      parseMatch(link, function(error, m) {
        if (error) {
          done(error);
          return;
        }

        matchlist.data.push(m);
        done();
      });
    }, function(error) {
      if (error) {
        callback(error);
        return;
      }

      callback(null, matchlist);
    });
  }));
}

function parseUpcomingPage(page, game, callback) {
  var matchlist = {};
  matchlist.data = [];

  var stream = hyperquest(BASE_URL + '/' + game + '/gosubet?u-page=' + page);

  stream.on('error', callback);

  stream.pipe(concat(function(data) {
    var $ = cheerio.load(data);
    var table = $('table.simple.matches');
    if (table.length === 2) {
      var recent = table.first();
    } else {
      var recent = table[1];
    }

    var matches = $('a.match', recent);

    var links = [];
    matches.each(function(i, el) {
      links[i] = BASE_URL + $(el).attr('href');
    });

    eachAsync(links, function(link, i, done) {
      parseMatch(link, function(error, m) {
        if (error) {
          done(error);
          return;
        }

        matchlist.data.push(m);
        done();
      });
    }, function(error) {
      if (error) {
        callback(error);
        return;
      }

      callback(null, matchlist);
    });
  }));
}

function parseCurrentPage(page, game, callback) {
  var matchlist = {};
  matchlist.data = [];

  var stream = hyperquest(BASE_URL + '/' + game + '/gosubet?u-page=' + page);

  stream.on('error', callback);

  stream.pipe(concat(function(data) {
    var $ = cheerio.load(data);
    var table = $('table.simple.matches');
    if (table.length === 2) {
      callback(null, {});
      return null;
    } else {
      var recent = table.first();
    }

    var matches = $('a.match', recent);

    var links = [];
    matches.each(function(i, el) {
      links[i] = BASE_URL + $(el).attr('href');
    });

    eachAsync(links, function(link, i, done) {
      parseMatch(link, function(error, m) {
        if (error) {
          done(error);
          return;
        }

        matchlist.data.push(m);
        done();
      });
    }, function(error) {
      if (error) {
        callback(error);
        return;
      }

      callback(null, matchlist);
    });
  }));
}

module.exports.parseMatchPage = parseMatchPage;
module.exports.parseUpcomingPage = parseUpcomingPage;
module.exports.parseCurrentPage = parseCurrentPage;
