
/**
 * Wrapper for searching mongo
 * @memberof Mongo
 * @param  {Object} options
 * @param  {Object} options.query search criteria
 * @param  {Object} options.sort sort criteria
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {FindResponse}
 */
function find(options, collectionName, db) {
  return db.collection(collectionName)
    .find(options.query)
    .sort(options.sort)
    .limit(options.limit)
    .toArray()
    .then(result => ({
      success: true,
      result,
    })
  );
}

module.exports = find;
