
const joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/match/',
  config: {
    validate: {
      query: {
        seasonId: joi.string().required(),
      },
      payload: {
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
    const _ = req.server.plugins.utilities.libraries._;
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const options = {
      query: {
        seasonId: req.query.seasonId
      },
      sort: {
        insertDate: -1
      }
    };

    return mongo.methods.findOne(options, 'seasons', mongo.db)
      .then((resp) => {
        const seasonDoc = _.clone(resp.result);

        // @TODO the following
        // find home id in array.
        // Update object with points.
        // Add match to history.
        // day index ++
        // find away id in array.
        // Update object with points.
        // Add match to history.
        // day index ++
        //
        // insert new season object.

        reply(seasonDoc).code(200);
      });
  }
};
