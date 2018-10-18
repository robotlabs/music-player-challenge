import React, { Component } from 'react';
import './style.css';

class SongItem extends Component {
  render() {
    console.log('this props index ', this.props.index);
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
