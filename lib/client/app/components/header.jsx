import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <header className="header">
        <div className="title"
          onClick={ () => this.props.onClick() }>
          { this.props.name }
        </div>
      </header>
    );
  }
}

export default Header;
