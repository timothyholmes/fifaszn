
module.exports = {
  method: 'GET',
  path: '/v1/season/list/',
  /**
   * @name getSeasonListHandler
   * @memberof Season
   * @description Handler for returning season doc
   * @param  {Hapi.request} req
   * @param  {Hapi.reply} reply
   * @return {ResponseMessage}
   */
  handler: function getSeasonListHandler(req, reply) {
    const mongo = req.server.plugins.utilities.libraries.mongo;
    const bluebird = req.server.plugins.utilities.libraries.bluebird;
    const options = {
      distinction: 'seasonId',
      sort: {
        insertDate: -1
      }
    };

    return mongo.methods.distinct(options, 'seasons', mongo.db)
      .then((resp) => {
        const ids = resp.result;

        return bluebird.map(ids, (id) => {
          const optionsForId = {
            limit: 1,
            query: {
              seasonId: id
            },
            sort: {
              insertDate: -1
            }
          };

          return mongo.methods.find(optionsForId, 'seasons', mongo.db)
            .then(result => ({
              seasonId: result.result[0].seasonId,
              name: result.result[0].name
            }));
        });
      })
      .then(resp => reply({
        success: true,
        resp,
      }).code(200));
  }
};
