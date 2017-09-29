import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import env from '../../../../config/env.js';
import FullScreenCard from './fullScreenCard.jsx';
import '../../public/main.css';

class CurrentSzn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'SCHEDULE',
      season: {}
    };
  }
  updateView(view) {
    this.setState({
      active: view
    })
  }
  componentDidMount() {
    axios.get(`${env.API_HOST}/v1/season/?seasonId=${this.props.seasonId}`)
      .then(res => {
        this.setState({
          season: res.data.result[0]
        });
      }).then(() => console.log(this.state));
  }
  render () {
    let leaderboard = [];

    if(this.state.season.players) {
      const players = [];

      this.state.season.players.forEach((e, i) => {
        const player = _.clone(e);
        player.ratio = e.points / (e.day + 1);
        players.push(player);
      });

      console.log('leaderboard', _.sortBy(players, 'ratio'));

      leaderboard = _.sortBy(players, 'ratio').map((player, key) => {
        return (
          <FullScreenCard
            key={ player.id }
            header={ player.name }
            subtext={ player.ratio }
          />
        )
      });

      console.log('leaderboard', leaderboard);
    }

    return (
      <section>
         <h1>{ this.state.season.name }</h1>
         <button onClick={ () => this.updateView('LEADERBOARD') }> Leaderboard </button>
         <button onClick={ () => this.updateView('SCHEDULE') }> Schedule </button>
         <section>
           {
             this.state.active === 'SCHEDULE' ? (
               'byebye'
             ) : (
               { leaderboard }
             )
           }
         </section>
      </section>
    );
  }
}

export default CurrentSzn;
