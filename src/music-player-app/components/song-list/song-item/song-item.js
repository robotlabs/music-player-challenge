import React, { Component } from 'react';
import './style.css';

class SongItem extends Component {
  render() {
    return (
      <li
          onClick = { () => {
            this.closeButton();
            this.props.passSubClick(this, this.props.item);
          }}
          key={this.props.index}>
          <a>{this.props.item.title}</a>
      </li>
    );
  }
}

export default SongItem;
