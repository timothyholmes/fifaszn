
const bluebird = require('bluebird');
const mongo = bluebird.promisifyAll(require('mongodb'));

module.exports = {};

/**
 * Initializes the mongo client with shared connection
 * @param  {String} url mongo url string
 * @return {Promise}
 */
function mongoClientInitialization(url) {
  return mongo.MongoClient.connectAsync(url)
    .then((db) => {
      module.exports.db = db;
      // attach methods to the mongo object here
      // @TODO find a better way to share the connection
      // eslint-disable-next-line
      module.exports.insert = require('./insert');
    });
}

mongoClientInitialization(`${process.env.MONGO_URL}fifaszn`);
