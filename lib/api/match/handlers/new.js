
const joi = require('joi');

const internals = {
  /**
   * Update the player object with new match
   * @param  {Player}    current
   * @param  {Player}    next
   * @param  {Results}   results
   * @param  {Boolean}   homeFlag
   * @param  {Function}  clone
   * @return {Player}
   */
  updatePlayerObject: (current, next, results, homeFlag, clone) => {
    const response = clone(current);

    // Update object with points.
    response.points = current.points + next.points;

    // Add match to history.
    response.history.push(results);

    // day index ++ for homers
    if (homeFlag) {
      response.day += 1;
    }

    return response;
  }
};

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
    const date = req.server.plugins.utilities.libraries.date;
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
      .then((resp) => {
        const seasonDoc = _.cloneDeep(resp.result[0]);

        const homeTeam = internals.updatePlayerObject(
          _.find(
            seasonDoc.players,
            player => player.id === req.payload.results.home.id
          ), req.payload.results.home,
          req.payload.results,
          true,
          _.clone
        );

        const awayTeam = internals.updatePlayerObject(
          _.find(
            seasonDoc.players,
            player => player.id === req.payload.results.away.id
          ), req.payload.results.away,
          req.payload.results,
          false,
          _.clone
        );

        const homeTeamIndex = _.findIndex(
          seasonDoc.players,
          player => player.id === req.payload.results.home.id
        );

        const awayTeamIndex = _.findIndex(
          seasonDoc.players,
          player => player.id === req.payload.results.away.id
        );

        seasonDoc.players[homeTeamIndex] = homeTeam;
        seasonDoc.players[awayTeamIndex] = awayTeam;

        seasonDoc.insertDate = date.now();

        // eslint-disable-next-line
        delete seasonDoc._id;

        return mongo.methods.insert(seasonDoc, 'seasons', mongo.db)
          .then(() => reply({
            message: `Season ${seasonDoc.name} updated`,
            result: seasonDoc
          }).code(200));
      });
  }
};
