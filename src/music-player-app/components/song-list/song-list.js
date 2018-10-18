import React, { Component } from 'react';
import './style.css';
//** single item */
import SongItem from './song-item/song-item';

class SongList extends Component {
  render() {
    //** prepare the list of songs, and create buttons */
    let listSubItems = <div></div>;
    listSubItems  = this.props.songs.map((item, index) => {
      //** default is false. we check on their index */
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

export default SongList;
