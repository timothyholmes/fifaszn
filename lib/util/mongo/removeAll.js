
/**
 * Wrapper for searching mongo
 * @memberof Mongo
 * @param  {Object} options
 * @param  {Object} options.query search criteria
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {FindOneResponse}
 */
function removeAll(options, collectionName, db) {
  return db.collection(collectionName)
    .remove(options.query)
    .then(result => ({
      success: true,
      result,
    })
  );
}

module.exports = removeAll;
