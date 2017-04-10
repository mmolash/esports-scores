# esports-scores
A node.js based web scraper that pulls professional esports scores from gosugamers and returns it in JSON format. Used for an Android application that showed scores to users.

# routes
By default, this server is hosted on port 8888. It has four routes:
### /upcomingMatches
This route will pull any future matches as available on gosugamers
### /currentMatches
This route will only return any ongoing matches
### /previousMatches
This route returns previous matches in addition to their results
### /register
This route registers a device ID on a mongoose database. This was used for a specific function in an app that made use of this.

# notes
node-modules is included because this app uses a modified version of a node module, which is not available via npm. Therefore, using this copy of node-modules is important for functionality.
However, to reduce size, you still need to run npm install to get the remaining modules from npm.