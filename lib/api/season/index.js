
/**
 * Routes relating to season
 * @namespace Season
 */
module.exports = (server) => {
  const utilities = server.plugins.utilities.helpers;
  const path = server.plugins.utilities.libraries.path;
  const absolutePath = path.resolve('lib/api/season/handlers');

  utilities.wireRoute(
    absolutePath,
    server
  );
};
