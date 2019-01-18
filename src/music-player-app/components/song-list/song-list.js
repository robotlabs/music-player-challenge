import React, { Component } from 'react';
import { array, number, func } from 'prop-types'
import './style.css';
//** single item */
import SongItem from './song-item/song-item';

class SongList extends Component {
  static propTypes = {
    songSelected: number,
    songClick: func,
    songs: array
  }
  render() {
    //** prepare the list of songs, and create buttons */
    let listSubItems = <div></div>;
    listSubItems  = this.props.songs.map((item, index) => {
      return (
        <SongItem
          selected={this.props.songSelected ? true : false}
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
