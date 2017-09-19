
const Lab = require('lab');
const should = require('should');
const _ = require('lodash');
const bluebird = require('bluebird');
const sinon = require('sinon');
const getSeason = require('../../../../../../lib/api/season/handlers/get');

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Season service', () => {
  describe('Get Season Route', () => {
    it('should return latest season for supplied id', (done) => {
      const codeStub = sinon.stub();
      const fineOneStub = sinon.stub().returns(bluebird.resolve({
        sample: 'results'
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
                mongo: {
                  db: 'mongodb',
                  methods: {
                    findOne: fineOneStub
                  }
                },
                _
              },
            },
          },
        }
      };

      getSeason.handler(requestStub, replyStub)
        .then(() => {
          should(fineOneStub.firstCall.args[0]).deepEqual({
            query: {
              seasonId: '12345'
            },
            sort: {
              insertDate: -1
            }
          });
          should(fineOneStub.firstCall.args[1]).equal('seasons');
          should(fineOneStub.firstCall.args[2]).equal('mongodb');
          should(replyStub.firstCall.args[0].sample).equal('results');
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
    it('should return latest season without id', (done) => {
      const codeStub = sinon.stub();
      const fineOneStub = sinon.stub().returns(bluebird.resolve({
        sample: 'results'
      }));
      const replyStub = sinon.stub().returns({ code: codeStub });
      const requestStub = {
        query: {},
        server: {
          plugins: {
            utilities: {
              libraries: {
                mongo: {
                  db: 'mongodb',
                  methods: {
                    findOne: fineOneStub
                  }
                },
                _
              },
            },
          },
        }
      };

      getSeason.handler(requestStub, replyStub)
        .then(() => {
          should(fineOneStub.firstCall.args[0]).deepEqual({
            query: {},
            sort: {
              insertDate: -1
            }
          });
          should(fineOneStub.firstCall.args[1]).equal('seasons');
          should(fineOneStub.firstCall.args[2]).equal('mongodb');
          should(replyStub.firstCall.args[0].sample).equal('results');
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
  });
});
