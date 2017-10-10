
const joi = require('joi');

const internals = {
  /**
   * Return default player object
   * @param  {Object} player
   * @property  {String} player.team
   * @property  {String} player.name
   * @property  {String} player.color
   * @property  {Boolean} player.cpu
   * @return {Object}
   */
  initializePlayerObject: (player, id) => ({
    id,
    day: 0,
    points: 0,
    name: player.name,
    team: player.team,
    color: player.color,
    cpu: player.cpu,
    schedule: [],
    history: []
  }),
  /**
   * Return default player object
   * @param  {Object} player
   * @property  {String} player.team
   * @property  {String} player.name
   * @property  {String} player.color
   * @property  {Boolean} player.cpu
   * @return {Object}
   */
  buildSchedule: (player, players, clone) => {
    const playersSubCurrent = players.filter(e => e.id !== player.id);
    const currentPlayer = clone(player);

    playersSubCurrent.forEach((e) => {
      currentPlayer.schedule.push({
        id: e.id,
        name: e.name
      });
    });

    return currentPlayer;
  }
};

module.exports = {
  method: 'POST',
  path: '/v1/season/',
  config: {
    validate: {
      payload: {
        seasonName: joi.string().required(),
        players: joi.array().items(
          joi.object().keys({
            name: joi.string().required(),
            team: joi.string().required(),
            color: joi.string().required(),
            cpu: joi.boolean().default(false),
          })
        )
      }
    }
  },
  /**
   * @name newSeasonHandler
   * @memberof Season
   * @description Handler for generating new schedule
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function newSeasonHandler(req, reply) {
    const _ = req.server.plugins.utilities.libraries._;
    const date = req.server.plugins.utilities.libraries.date;
    const uuidv4 = req.server.plugins.utilities.libraries.uuidv4;
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const players = _.clone(req.payload.players)
      .map(player => internals.initializePlayerObject(player, uuidv4()));

    if (players.length % 4 !== 0) {
      return reply({
        message: 'Must be a multiple of 4 players in a season'
      }).code(400);
    }

    const season = {
      name: req.payload.seasonName,
      insertDate: date.now(),
      seasonId: uuidv4(),
      players: players
        .map(player => internals.buildSchedule(player, players, _.clone))
    };

    return mongo.methods.insert(season, 'seasons', mongo.db)
      .then(() => reply({
        message: 'New season created',
        result: season
      }).code(200));
  }
};
