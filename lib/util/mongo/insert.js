
const Bluebird = require('bluebird');
const MongoDB = Bluebird.promisifyAll(require('mongodb'));

const Url = `${process.env.MONGO_URL}fifaszn`;

module.exports = (payload, collectionName) => {
  let connection;

  return MongoDB.MongoClient.connectAsync(Url)
    .then((db) => {
      connection = db;

      return db.collection(collectionName).insert(payload);
    })
    .then((result) => {
      connection.close();

      return {
        success: true,
        recordsInserted: result.insertedCount
      };
    });
};
