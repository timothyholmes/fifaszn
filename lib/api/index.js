
/**
 * @typedef {Object} ResponseMessage
 * @param {String} message
 * @param {Object} [result] Result of operation
 */

const schedule = require('./schedule');
const season = require('./season');

exports.register = (server, options, next) => {
  const subServices = [
    schedule,
    season
  ];

  subServices.forEach(service => service(server));

  next();
};

exports.register.attributes = {
  name: 'api-plugin'
};
