import React, { Component } from 'react';
import SongListJson from './data/song-list-json';
import SongList from './components/song-list/song-list';
import AudioController from './components/audio-controller/audio-controller';
import './app.css';

class App extends Component {
  render() {
    console.log('Song List ', SongListJson);
    return (
      <div>
        <SongList
          songs={SongListJson}>
        </SongList>
        <AudioController></AudioController>
      </div>
    );
  }
}

export default App;
