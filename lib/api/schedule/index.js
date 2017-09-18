
module.exports = (server) => {
  const utilities = server.plugins.utilities.methods;
  const absolutePath = utilities.path.resolve('lib/api/schedule/handlers');

  utilities.wireRoute(
    absolutePath,
    server
  );
};
