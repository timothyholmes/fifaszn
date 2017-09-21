import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

class FullScreenCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <section className="fullScreenCard">
        <h1>
          { this.props.name }
        </h1>
        <div> {this.props.id} </div>
      </section>
    );
  }
}

export default FullScreenCard;
