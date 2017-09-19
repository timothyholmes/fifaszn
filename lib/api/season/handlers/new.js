
const joi = require('joi');

const internals = {
  /**
   * Return default player object
   * @param  {Object} player
   * @property  {String} player.team
   * @property  {String} player.color
   * @property  {Boolean} player.cpu
   * @return {Object}
   */
  initializePlayerObject: player => ({
    day: 0,
    points: 0,
    team: player.team,
    color: player.color,
    cpu: player.cpu,
    schedule: [],
    results: []
  })
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
            id: joi.string().required(),
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
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const uuidv4 = req.server.plugins.utilities.libraries.uuidv4;
    const date = req.server.plugins.utilities.libraries.date;
    const players = req.payload.players;

    if (players.length % 4 !== 0) {
      return reply({
        message: 'Must be a multiple of 4 players in a season'
      }).code(400);
    }

    const schedules = {
      name: req.payload.seasonName,
      insertDate: date.now(),
      seasonId: uuidv4()
    };

    players.forEach((outerPlayer) => {
      schedules[outerPlayer.id] = internals.initializePlayerObject(outerPlayer);

      players.forEach((innerPlayer) => {
        if (outerPlayer.id !== innerPlayer.id) {
          schedules[outerPlayer.id].schedule.push({
            home: outerPlayer.id,
            away: innerPlayer.id
          });
        }
      });
    });

    return mongo.methods.insert(schedules, 'seasons', mongo.db)
      .then(() => reply({
        message: 'New schedules created',
        result: schedules
      }).code(200));
  }
};
