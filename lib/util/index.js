const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mongo = require('./mongo');

exports.methods = {
  /**
   * Helper method to dynamically register routes in a single directory
   * @memberof Util
   * @param  {String} absolutePath path to directory that holds route files
   * @param  {Hapi.server} server       server reference with which to wire routes
   */
  wireRoute(absolutePath, server) {
    fs.readdirSync(absolutePath).forEach((f) => {
      // eslint-disable-next-line
      server.route(require(path.join(absolutePath, f)));
    });
  },
  // Putting path and lodash here so they can
  // be easily accessed in other plugins
  path,
  _,
  // Data methods go here
  mongo
};

/**
 * Route for posting lead events.
 * @namespace Util
 */
exports.register = (server, options, next) => {
  server.expose('methods', exports.methods);

  next();
};

exports.register.attributes = {
  name: 'utilities'
};
