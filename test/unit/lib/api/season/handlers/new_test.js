
const Lab = require('lab');
const should = require('should');
const bluebird = require('bluebird');
const _ = require('lodash');
const sinon = require('sinon');
const newSeason = require('../../../../../../lib/api/season/handlers/new');
const mocks = require('../../../../../mocks/newSeasonMocks').expectedSuccess;

exports.lab = Lab.script();
const lab = exports.lab;

const describe = lab.describe;
const it = lab.it;

describe('Season service', () => {
  describe('New Season Route', () => {
    it('should generate a schedule and initialize data', (done) => {
      let idCounter = 1;
      const codeStub = sinon.stub();
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
                    insert: insertStub
                  }
                },
                _,
                date: {
                  now: () => '12345'
                },
                uuidv4: () => {
                  idCounter += 1;
                  return String(idCounter);
                }
              },
            },
          },
        },
        payload: {
          seasonName: 'Unit Testing',
          players: [
            {
              team: 'Man U',
              name: 'Andrew',
              color: 'ff0000',
              cpu: true
            },
            {
              team: 'Chelsea',
              name: 'Matt',
              color: '00ff00',
              cpu: true
            },
            {
              team: 'HotSpurs',
              name: 'Tim',
              color: '0000ff',
              cpu: false
            },
            {
              team: 'Arsenal',
              name: 'Tony',
              color: 'ffff00',
              cpu: false
            }
          ]
        }
      };

      newSeason.handler(requestStub, replyStub)
        .then(() => {
          should(insertStub.firstCall.args[0]).deepEqual(mocks);
          should(insertStub.firstCall.args[1]).equal('seasons');
          should(insertStub.firstCall.args[2]).equal('mongodb');
          should(replyStub.firstCall.args[0].message).equal('New season created');
          should(replyStub.firstCall.args[0].result).deepEqual(mocks);
          should(codeStub.firstCall.args[0]).equal(200);

          done();
        });
    });
    it('should return error when players are incorrect size', (done) => {
      const codeStub = sinon.stub();
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
                    insert: insertStub
                  }
                },
                _,
                date: {
                  now: () => '12345'
                },
                uuidv4: () => '54321'
              },
            },
          },
        },
        payload: {
          seasonName: 'Unit Testing',
          players: [
            {
              id: '1',
              team: 'Man U',
              color: 'ff0000',
              cpu: true
            }
          ]
        }
      };

      newSeason.handler(requestStub, replyStub);

      should(replyStub.firstCall.args[0].message).equal('Must be a multiple of 4 players in a season');
      should(codeStub.firstCall.args[0]).deepEqual(400);
      should(insertStub.callCount).equal(0);

      done();
    });
  });
});
