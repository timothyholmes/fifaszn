
const joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/match/',
  config: {
    validate: {
      payload: {
        seasonId: joi.string().required(),
        players: joi.object().keys({
          home: joi.object().keys({
            id: joi.string().required(),
            points: joi.number().required()
          }),
          away: joi.object().keys({
            id: joi.string().required(),
            points: joi.number().required()
          })
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

    return mongo.methods.insert({}, 'seasons', mongo.db)
      .then(() => reply({
        message: 'New schedules created',
        result: {}
      }).code(200));
  }
};
