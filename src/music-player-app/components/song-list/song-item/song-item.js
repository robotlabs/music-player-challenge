import React, { Component } from 'react';
import {bool, func, object} from 'prop-types'
import './style.css';

class SongItem extends Component {
  static propTypes = {
    selected: bool,
    passClick: func,
    item: object
  }
  static defaultProps = {
    selected: false,
    passClick: null,
    key: -1,
    item: {}
  }
  render() {
    return (
      <li
        className={this.props.selected ? 'box-song-item selected' : 'box-song-item'}
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
