
/**
 * @typedef {Object} ResponseMessage
 * @param {String} message
 * @param {Object} [result] Result of operation
 */

exports.register = (server, options, next) => {
  const subServices = [
    // eslint-disable-next-line
    require('./schedule')
  ];

  subServices.forEach(service => service(server));

  next();
};

exports.register.attributes = {
  name: 'api-plugin'
};
