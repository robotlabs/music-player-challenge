import React, { Component } from 'react';
import SongListJson from './data/song-list-json';
import SongList from './components/song-list/song-list';
import AudioController from './components/audio-controller/audio-controller';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songSelected: 0
    }
    this.audioController = React.createRef();
  }

  //** user interaction */

  //** song selected through song list */
  songClick = (e) => {
    this.setState({
      songSelected: e.props.index
    });
  }
  //** automatic play when a song end */
  playNextTrack = () => {
    this.setState(() => {
      let nextSong = this.state.songSelected + 1;
      if (nextSong >= SongListJson.length) {
        nextSong = 0;
      }
      return {
        songSelected: nextSong
      };
    });
  }
  render() {
    return (
      <div>
        <SongList
          songSelected={this.state.songSelected}
          songClick={this.songClick}
          songs={SongListJson}>
        </SongList>
        <AudioController
          ref={this.audioController}
          playNextTrack={this.playNextTrack}
          songListData={SongListJson}
          songSelected={this.state.songSelected}
        ></AudioController>
      </div>
    );
  }
}

export default App;
