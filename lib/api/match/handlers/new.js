
const joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/match/',
  config: {
    validate: {
      payload: {
        seasonId: joi.string().required(),
        results: joi.object().keys({
          home: joi.object().keys({
            id: joi.string().required(),
            points: joi.number().required()
          }).required(),
          away: joi.object().keys({
            id: joi.string().required(),
            points: joi.number().required()
          }).required()
        })
      }
    }
  },
  /**
   * @name newMatchHandler
   * @memberof Match
   * @description Handler for recording new match
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function newMatchHandler(req, reply) {
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const options = {
      query: {
        seasonId: req.payload.seasonId
      },
      sort: {
        insertDate: -1
      }
    };

    return mongo.methods.findOne(options, 'seasons', mongo.db)
      .then(resp => reply(resp).code(200));
  }
};
