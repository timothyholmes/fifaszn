
/**
 * @typedef {Object} ResponseMessage
 * @param {String} message
 * @param {Object} [result] Result of operation
 */

const schedule = require('./schedule');

exports.register = (server, options, next) => {
  const subServices = [
    schedule
  ];

  subServices.forEach(service => service(server));

  next();
};

exports.register.attributes = {
  name: 'api-plugin'
};
