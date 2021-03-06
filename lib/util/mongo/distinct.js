
/**
 * Wrapper for searching mongo
 * @memberof Mongo
 * @param  {Object} options
 * @param  {Object} options.query search criteria
 * @param  {Object} options.sort sort criteria
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {FindOneResponse}
 */
function distinct(options, collectionName, db) {
  return db.collection(collectionName)
    .distinct(options.distinction)
    .then(result => ({
      success: true,
      result,
    })
  );
}

module.exports = distinct;
