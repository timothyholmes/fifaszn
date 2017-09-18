
/**
 * Routes relating to schedule generation and manipulation
 * @namespace Schedule
 */
module.exports = (server) => {
  const utilities = server.plugins.utilities.methods;
  const absolutePath = utilities.path.resolve('lib/api/schedule/handlers');

  utilities.wireRoute(
    absolutePath,
    server
  );
};
