
const Lab = require('lab');
const should = require('should');
const _ = require('lodash');
const bluebird = require('bluebird');
const sinon = require('sinon');
const getList = require('../../../../../../lib/api/season/handlers/getList');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Season service', () => {
  describe('Get Season Route', () => {
    it('should return latest season for supplied id', (done) => {
      const codeStub = sinon.stub();
      const distinctStub = sinon.stub().returns(bluebird.resolve({
        result: [
          '1234',
          '2345',
          '3456'
        ]
      }));
      const findStub = sinon.stub().returns(bluebird.resolve({
        result: [{
          seasonId: '1234',
          name: 'name'
        }]
      }));
      const replyStub = sinon.stub().returns({ code: codeStub });
      const requestStub = {
        query: {
          seasonId: '12345'
        },
        server: {
          plugins: {
            utilities: {
              libraries: {
                bluebird,
                mongo: {
                  db: 'mongodb',
                  methods: {
                    distinct: distinctStub,
                    find: findStub
                  }
                },
                _
              },
            },
          },
        }
      };

      getList.handler(requestStub, replyStub)
        .then(() => {
          should(distinctStub.firstCall.args[0]).deepEqual({
            distinction: 'seasonId',
            sort: {
              insertDate: -1
            }
          });
          should(findStub.firstCall.args[0]).deepEqual({
            limit: 1,
            query: {
              seasonId: '1234'
            },
            sort: {
              insertDate: -1
            }
          });
          should(replyStub.firstCall.args[0].resp).deepEqual([
            {
              seasonId: '1234',
              name: 'name'
            },
            {
              seasonId: '1234',
              name: 'name'
            },
            {
              seasonId: '1234',
              name: 'name'
            }
          ]);
          should(distinctStub.firstCall.args[1]).equal('seasons');
          should(distinctStub.firstCall.args[2]).equal('mongodb');
          should(findStub.firstCall.args[1]).equal('seasons');
          should(findStub.firstCall.args[2]).equal('mongodb');
          should(findStub.secondCall.args[0].query.seasonId).equal('2345');
          should(findStub.thirdCall.args[0].query.seasonId).equal('3456');
          should(replyStub.firstCall.args[0].success).equal(true);
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
  });
});
