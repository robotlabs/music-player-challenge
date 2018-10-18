import React, { Component } from 'react';
import './style.css';

import SongItem from './song-item/song-item';

class App extends Component {
  render() {
    let listSubItems = <div></div>;
    listSubItems  = this.props.songs.map((item, index) => {
      console.log('item ', item, index);
      console.log('song selected ', this.props.songSelected);
      let selected = false;
      if (this.props.songSelected === index) {
        selected = true;
      }
      return (
        <SongItem
          selected={selected}
          passClick={this.props.songClick}
          key={index}
          index={index}
          item={item}>
        </SongItem>
      );
    });

    return (
      <div 
        className="box-song-list">
        <h1
          className="songs-list-title">SONGS</h1>
        <ul
          className="song-list">
          {listSubItems}
        </ul>
      </div>
    );
  }
}

export default App;
