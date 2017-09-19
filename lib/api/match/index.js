
/**
 * Routes relating to match
 * @namespace Match
 */
module.exports = (server) => {
  const utilities = server.plugins.utilities.helpers;
  const path = server.plugins.utilities.libraries.path;
  const absolutePath = path.resolve('lib/api/match/handlers');

  utilities.wireRoute(
    absolutePath,
    server
  );
};
