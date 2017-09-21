
const joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/v1/season/',
  config: {
    validate: {
      query: {
        seasonId: joi.string().required()
      }
    }
  },
  /**
   * @name getSeasonHandler
   * @memberof Season
   * @description Handler for returning season doc
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function getSeasonHandler(req, reply) {
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const options = {
      limit: 1,
      query: {
        seasonId: req.query.seasonId
      },
      sort: {
        insertDate: -1
      }
    };

    return mongo.methods.find(options, 'seasons', mongo.db)
      .then(resp => reply(resp).code(200));
  }
};
