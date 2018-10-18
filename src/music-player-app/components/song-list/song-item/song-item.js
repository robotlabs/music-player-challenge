import React, { Component } from 'react';
import './style.css';

class SongItem extends Component {
  render() {
    return (
      <li
        className={'box-song-item'}
          onClick = { () => {
            this.props.passClick(this, this.props.item);
          }}>
          <a>{this.props.item.title}</a>
      </li>
    );
  }
}

export default SongItem;
