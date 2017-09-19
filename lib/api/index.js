
/**
 * @typedef {Object} ResponseMessage
 * @param {String} message
 * @param {Object} [result] Result of operation
 */

const season = require('./season');

exports.register = (server, options, next) => {
  const subServices = [
    season
  ];

  subServices.forEach(service => service(server));

  next();
};

exports.register.attributes = {
  name: 'api-plugin'
};
