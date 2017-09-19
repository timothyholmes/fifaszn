
/**
 * Wrapper for inserting to mongo
 * @memberof Mongo
 * @param  {Object} payload
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {InsertResponse}
 */
function insert(payload, collectionName, db) {
  return db.collection(collectionName).insertAsync(payload)
    .then(result => ({
      success: true,
      recordsInserted: result.insertedCount
    })
  );
}

module.exports = insert;
