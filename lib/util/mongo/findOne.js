
/**
 * Wrapper for searching mongo
 * @memberof Mongo
 * @param  {Object} options
 * @property  {Object} options.query search criteria
 * @property  {Object} options.sort sort criteria
 * @param  {String} collectionName
 * @param  {Mongo.db} db
 * @return {FindOneResponse}
 */
function findOne(options, collectionName, db) {
  return db.collection(collectionName)
    .find(options.query)
    .sort(options.sort)
    .limit(1)
    .toArray()
    .then(result => ({
      success: true,
      result,
    })
  );
}

module.exports = findOne;
