
/**
 * Routes relating to schedule generation and manipulation
 * @namespace Schedule
 */
module.exports = (server) => {
  const utilities = server.plugins.utilities.helpers;
  const path = server.plugins.utilities.libraries.path;
  const absolutePath = path.resolve('lib/api/schedule/handlers');

  utilities.wireRoute(
    absolutePath,
    server
  );
};
