
const hapi = require('hapi');
const good = require('good');
const inert = require('inert');
const api = require('./api');
const util = require('./util');

module.exports = () => {
  const server = new hapi.Server();
  const registerOptions = [
    {
      register: inert,
      options: {}
    },
    {
      register: good,
      options: {
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*'
            }]
          }, {
            module: 'good-console'
          }, 'stdout']
        }
      }
    },
    {
      register: util
    },
    {
      register: api
    }
  ];

  server.connection({
    host: 'localhost',
    port: 8000,
    labels: 'api'
  });

  server.register(registerOptions, (registerError) => {
    if (registerError) {
      throw registerError;
    }

    server.start((err) => {
      if (err) {
        throw err;
      }

      server.log('info', `Server running at:  ${server.info.uri}`);
    });
  });
};
