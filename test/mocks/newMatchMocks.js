module.exports = {
  expectedSuccess: {
    players: [{
      id: '2',
      day: 0,
      points: 0,
      team: 'Man U',
      name: 'Andrew',
      color: 'ff0000',
      cpu: true,
      schedule: [
        { home: '2', away: '3' },
        { home: '2', away: '4' },
        { home: '2', away: '5' }
      ],
      history: [
        {
          home: {
            id: '4',
            points: 3
          },
          away: {
            id: '2',
            points: 0
          }
        }
      ]
    }, {
      id: '3',
      day: 0,
      points: 0,
      team: 'Chelsea',
      name: 'Matt',
      color: '00ff00',
      cpu: true,
      schedule: [
        { home: '3', away: '2' },
        { home: '3', away: '4' },
        { home: '3', away: '5' }
      ],
      history: []
    }, {
      id: '4',
      day: 1,
      points: 3,
      team: 'HotSpurs',
      name: 'Tim',
      color: '0000ff',
      cpu: false,
      schedule: [
        { home: '4', away: '2' },
        { home: '4', away: '3' },
        { home: '4', away: '5' }
      ],
      history: [
        {
          home: {
            id: '4',
            points: 3
          },
          away: {
            id: '2',
            points: 0
          }
        }
      ]
    }, {
      id: '5',
      day: 0,
      points: 0,
      team: 'Arsenal',
      name: 'Tony',
      color: 'ffff00',
      cpu: false,
      schedule: [
        { home: '5', away: '2' },
        { home: '5', away: '3' },
        { home: '5', away: '4' }
      ],
      history: []
    }],
    name: 'Unit Testing',
    insertDate: '12345',
    seasonId: '6'
  }
};
