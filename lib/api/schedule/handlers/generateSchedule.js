
const joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/v1/schedule/new',
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
   * @name newScheduleHandler
   * @memberof Schedule
   * @description Handler for generating new schedule
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function newScheduleHandler(req, reply) {
    const players = req.payload.players;
    const schedules = {
      name: req.payload.seasonName
    };

    if (players.length % 4 !== 0) {
      reply({
        message: 'Must be a multiple of 4 players in a season'
      }).code(400);
    }

    // build home schedules
    players.forEach((outerPlayer) => {
      // initialize player object
      schedules[outerPlayer.id] = {};
      schedules[outerPlayer.id].day = 0;
      schedules[outerPlayer.id].points = 0;
      schedules[outerPlayer.id].team = outerPlayer.team;
      schedules[outerPlayer.id].color = outerPlayer.color;
      schedules[outerPlayer.id].cpu = outerPlayer.cpu;
      schedules[outerPlayer.id].schedule = [];
      schedules[outerPlayer.id].results = [];

      players.forEach((innerPlayer) => {
        if (outerPlayer.id !== innerPlayer.id) {
          schedules[outerPlayer.id].schedule.push({
            home: outerPlayer.id,
            away: innerPlayer.id
          });
        }
      });
    });

    return req.server.plugins.utilities.methods.mongo.insert(schedules, 'seasons')
      .then(() => reply({
        message: 'New schedules created',
        result: schedules
      }).code(200)
    );
  }
};
