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
      <section className="full-screen-card"
          onClick={ () => this.props.onClick() }>
        <h1>
          { this.props.header }
        </h1>
        <div>
          {this.props.subtext}
        </div>
      </section>
    );
  }
}

export default FullScreenCard;
