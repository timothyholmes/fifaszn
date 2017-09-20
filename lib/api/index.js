
/**
 * @typedef {Object} ResponseMessage
 * @param {String} message
 * @param {Object} [result] Result of operation
 */

const season = require('./season');
const match = require('./match');

exports.register = (server, options, next) => {
  const subServices = [
    season,
    match
  ];

  subServices.forEach(service => service(server));

  next();
};

exports.register.attributes = {
  name: 'api-plugin'
};
