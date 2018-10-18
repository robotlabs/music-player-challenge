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

    document.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'Space':
          this.audioController.current.playClick();
        break;
        case 'ArrowRight': 
        case 'ArrowDown': 
          this.playNextTrack();
        break;
        case 'ArrowLeft': 
        case 'ArrowUp': 
          this.playPrevTrack();
        break;
        default:
      }
    });
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
  //** automatic play when a song end */
  playPrevTrack = () => {
    this.setState(() => {
      let nextSong = this.state.songSelected - 1;
      if (nextSong < 0) {
        nextSong = SongListJson.length - 1;
      }
      return {
        songSelected: nextSong
      };
    });
  }
  /* main components are song list and audio controller.
  song list control the top part of screen. create a list of songs, 
  and interact with app.
  audio controllers take care of audio, and display his controllers ( play, pause, interactive progress bar)
   */
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
          songSelected={this.state.songSelected}
          playNextTrack={this.playNextTrack}
          songListData={SongListJson}>
        </AudioController>
      </div>
    );
  }
}

export default App;
