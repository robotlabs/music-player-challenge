import React, { Component } from 'react';
import './style.css';

import SongItem from './song-item/song-item';

class App extends Component {
  render() {
    let listSubItems = <div></div>;
    listSubItems  = this.props.songs.map((item, index) => {
      return (
        <SongItem
          passClick={this.props.songClick}
          key={index}
          index={index}
          item={item}>
        </SongItem>
      );
    });

    return (
      <ul
        className="box-song-list">
        {listSubItems}
        </ul>
    );
  }
}

export default App;
