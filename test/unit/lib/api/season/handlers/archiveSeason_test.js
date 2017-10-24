
const Lab = require('lab');
const should = require('should');
const _ = require('lodash');
const bluebird = require('bluebird');
const sinon = require('sinon');
const archiveSeason = require('../../../../../../lib/api/season/handlers/archiveSeason');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Season service', () => {
  describe('Archive Season Route', () => {
    it('should archive the supplied season', (done) => {
      const codeStub = sinon.stub();
      const fineOneStub = sinon.stub().returns(bluebird.resolve({
        result: [
          true
        ]
      }));
      const insertStub = sinon.stub().returns(bluebird.resolve(true));
      const removeAllStub = sinon.stub().returns(bluebird.resolve({
        sample: 'results'
      }));
      const replyStub = sinon.stub().returns({ code: codeStub });
      const requestStub = {
        payload: {
          seasonId: '12345'
        },
        server: {
          plugins: {
            utilities: {
              libraries: {
                mongo: {
                  db: 'mongodb',
                  methods: {
                    find: fineOneStub,
                    insert: insertStub,
                    removeAll: removeAllStub,
                  }
                },
                _
              },
            },
          },
        }
      };

      archiveSeason.handler(requestStub, replyStub)
        .then(() => {
          should(fineOneStub.firstCall.args[0]).deepEqual({
            limit: 1,
            query: {
              seasonId: '12345'
            },
            sort: {
              insertDate: -1
            }
          });
          should(fineOneStub.firstCall.args[1]).equal('seasons');
          should(fineOneStub.firstCall.args[2]).equal('mongodb');
          should(insertStub.firstCall.args[0]).deepEqual(true);
          should(insertStub.firstCall.args[1]).equal('archive');
          should(insertStub.firstCall.args[2]).equal('mongodb');
          should(removeAllStub.firstCall.args[0]).deepEqual({
            limit: 9999,
            query: {
              seasonId: '12345'
            }
          });
          should(removeAllStub.firstCall.args[1]).equal('seasons');
          should(removeAllStub.firstCall.args[2]).equal('mongodb');
          should(replyStub.firstCall.args[0].sample).equal('results');
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
  });
});
