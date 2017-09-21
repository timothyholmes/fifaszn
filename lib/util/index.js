const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mongoMethods = require('./mongo');
const bluebird = require('bluebird');
const uuidv4 = require('uuid/v4');
const mongodb = bluebird.promisifyAll(require('mongodb'));

const mongoUrl = `${process.env.MONGO_URL}fifaszn`;

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
  }
};

/**
 * Utilities namespace
 * @namespace Util
 */
exports.register = (server, options, next) => {
  server.expose('helpers', exports.methods);

  return mongodb.MongoClient.connectAsync(mongoUrl)
    .then((db) => {
      server.expose('libraries', {
        mongo: {
          db,
          methods: mongoMethods
        },
        path,
        bluebird,
        _,
        uuidv4,
        date: Date
      });
      next();
    });
};

exports.register.attributes = {
  name: 'utilities'
};
