module.exports = {
  method: 'GET',
  path: '/v1/test',
  handler(req, reply) {
    reply({
      hello: 'world'
    });
  }
};
