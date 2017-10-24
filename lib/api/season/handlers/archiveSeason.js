
const joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/season/archive/',
  config: {
    validate: {
      payload: {
        seasonId: joi.string().required()
      }
    }
  },
  /**
   * @name archiveSeason
   * @memberof Season
   * @description Handler for archiving season
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function archiveSeason(req, reply) {
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const getLatestOptions = {
      limit: 1,
      query: {
        seasonId: req.payload.seasonId
      },
      sort: {
        insertDate: -1
      }
    };

    const removeOptions = {
      limit: 9999,
      query: {
        seasonId: req.payload.seasonId
      }
    };

    return mongo.methods.find(getLatestOptions, 'seasons', mongo.db)
      .then(resp => mongo.methods.insert(resp.result[0], 'archive', mongo.db))
      .then(() => mongo.methods.removeAll(removeOptions, 'seasons', mongo.db))
      .then(resp => reply(resp).code(200));
  }
};
