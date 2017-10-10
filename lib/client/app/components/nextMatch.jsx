import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import env from '../../../../config/env.js';
import '../../public/main.css';

class NextMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: props.player
    };

    console.log('this.state', this.state);
  }
  render () {

    const nextMatch = this.state.player.schedule[
      this.state.player.day
    ];

    return (
      <section>
        <h1>Name: { this.state.player.name }</h1>
        <h3>Team: { this.state.player.team }</h3>
        <h3>Day: { this.state.player.day }</h3>
        <h2>Next Match: </h2>
        nextMatch
      </section>
    );
  }
}

export default NextMatch;
