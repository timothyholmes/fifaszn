
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const _ = require('lodash');
const sinon = require('sinon');
const newMatch = require('../../../../../../lib/api/match/handlers/new');
const newSeasonMocks = require('../../../../../mocks/newSeasonMocks').expectedSuccess;
const newMatchMocks = require('../../../../../mocks/newMatchMocks').expectedSuccess;

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Match service', () => {
  describe('New Match Route', () => {
    it('should', (done) => {
      const codeStub = sinon.stub();
      const findOneStub = sinon.stub().returns(
        bluebird.resolve({
          result: [
            newSeasonMocks
          ]
        })
      );
      const insertStub = sinon.stub().returns(bluebird.resolve());
      const replyStub = sinon.stub().returns({ code: codeStub });
      const requestStub = {
        server: {
          plugins: {
            utilities: {
              libraries: {
                mongo: {
                  db: 'mongodb',
                  methods: {
                    insert: insertStub,
                    findOne: findOneStub
                  }
                },
                _,
                date: {
                  now: () => '12345'
                }
              },
            },
          },
        },
        query: {
          seasonId: '12345'
        },
        payload: {
          results: {
            home: {
              id: '4',
              points: 3
            },
            away: {
              id: '2',
              points: 0
            }
          }
        }
      };

      newMatch.handler(requestStub, replyStub)
        .then(() => {
          should(findOneStub.firstCall.args[0]).deepEqual({
            query: {
              seasonId: '12345'
            },
            sort: {
              insertDate: -1
            }
          });
          should(findOneStub.firstCall.args[1]).equal('seasons');
          should(findOneStub.firstCall.args[2]).equal('mongodb');
          should(insertStub.firstCall.args[0]).deepEqual(newMatchMocks);
          should(insertStub.firstCall.args[1]).equal('seasons');
          should(insertStub.firstCall.args[2]).equal('mongodb');
          should(replyStub.firstCall.args[0].message).equal('Season Unit Testing updated');
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
  });
});
