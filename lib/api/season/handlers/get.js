
const joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/v1/season/get',
  config: {
    validate: {
      query: {
        // @TODO use the season id for querying mongo
        seasonId: joi.string().optional()
      }
    }
  },
  /**
   * @name getSeasonHandler
   * @memberof Schedule
   * @description Handler for generating new schedule
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function getSeasonHandler(req, reply) {
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const options = {
      query: {},
      sort: {
        insertDate: -1
      }
    };

    return mongo.methods.findOne(options, 'seasons', mongo.db)
      .then(resp => reply(resp).code(200));
  }
};
