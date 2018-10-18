import React, { Component } from 'react';
import './style.css';

class SongItem extends Component {
  render() {
    //** conditional style, if element is selected, we change the font color */
    let s = 'box-song-item';
    if (this.props.selected) {
      s = 'box-song-item selected'
    }
    return (
      <li
        className={s}
          onClick = { () => {
            this.props.passClick(this, this.props.item);
          }}>
          <a>{this.props.item.title + ' (' + this.props.item.duration + 's)'}</a>
          <div
            className="box-author">{this.props.item.author}</div>
      </li>
    );
  }
}

export default SongItem;
