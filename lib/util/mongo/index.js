
const insert = require('./insert');
const find = require('./find');
const distinct = require('./distinct');
const removeAll = require('./removeAll');

/**
 * Mongo namespace
 * @namespace Mongo
 */
module.exports = {
  insert,
  find,
  distinct,
  removeAll
};
