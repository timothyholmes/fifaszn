import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import env from '../../../../config/env.js';
import FullScreenCard from './fullScreenCard.jsx';
import NextMatch from './nextMatch.jsx';
import '../../public/main.css';

class SeasonSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      season: props.season
    };
  }
  renderSchedule() {
    return this.state.season.players.map((player, key) => {
      return (
        <NextMatch
          key={ key }
          player={ player }
        />
      )
    });
  }
  postMatch() {
    axios.get(`${env.API_HOST}/v1/season/?seasonId=${this.props.seasonId}`)
      .then(res => {

      }).then(() => console.log(this.state));
  }
  render () {

    return (
      <section>
        { this.renderSchedule() }
      </section>
    );
  }
}

export default SeasonSchedule;
