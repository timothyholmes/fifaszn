
const db = require('./index').db;

/**
 * Wrapper for inserting to mongo
 * @param  {Object} payload
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {InsertResponse}
 */
module.exports = function mongoInsert(payload, collectionName) {
  return db.collection(collectionName).insertAsync(payload)
    .then(result => ({
      success: true,
      recordsInserted: result.insertedCount
    })
  );
};
