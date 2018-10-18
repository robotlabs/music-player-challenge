import React, { Component } from 'react';
import './style.css';

class SongItem extends Component {
  render() {
    let s = 'box-song-item';
    console.log('this props selecte d ', this.props.selected);
    if (this.props.selected) {
      s = 'box-song-item selected'
    }
    return (
      <li
        className={s}
          onClick = { () => {
            this.props.passClick(this, this.props.item);
          }}>
          <a>{this.props.item.title}</a>
      </li>
    );
  }
}

export default SongItem;
