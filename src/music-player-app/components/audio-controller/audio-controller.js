import React, { Component } from 'react';
import {number, func, array} from 'prop-types';
import './style.css';

//** presentationals */
import {PlayBt, NextBt, ProgressBar, CopySong} from './presentationals';

class AudioControllers extends Component {
  state = { play: false };
  static propTypes = {
    songSelected: number,
    playNextTrack: func,
    songListData: array
  }
  static defaultProps = {
    songSelected: 0,
    playNextTrack: null,
    songListData: []
  }

  constructor(props) {
    super(props);
    //** create refs */
    this.node = React.createRef();
    this.barIn = React.createRef();
    this.playBt = React.createRef();
    this.timeRemainingDiv = React.createRef();
    //** init class stuff */
    this.urlBase = "./mp3/";
    this.audio = new Audio();
    /* load track. pause is default as false */
    this.loadTrack(this.props);
  }
  componentDidMount() {
    this.audio.addEventListener("ended", () => {
      //** play next in the list */
      this.props.playNextTrack();
    });
    
    /* start request animation frame */
    this.run();
  }

  //** called when play pause is clicked */
  playClick = () => {
    if (this.state.play) {
      this.setState({ play: false})
      this.audio.pause();
      this.playBt.current.classList.remove('paused');
    } else {
      this.setState({ play: true})
      this.audio.play();
      this.playBt.current.classList.add('paused');
    }
  }

  //** called when user click on the progress bar */
  progressBarClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const percW = x / rect.width;
    this.audio.currentTime = this.audio.duration * (percW);
  }

  //** load a track and if state is not paused, play it */
  loadTrack(props) {
    this.songSelected = this.props.songListData[props.songSelected];
    const url = this.urlBase + this.songSelected.file;
    if (this.audio) {
      this.audio.src = url;
      if (this.state.play) {
        this.playTrack();
      }
    }
  }
  playTrack() {
    this.audio.play();
  }
  //** if user update track */
  componentWillUpdate(nextProps) {
    if (nextProps.songSelected !== this.props.songSelected) {
      this.loadTrack(nextProps);
    }
  }
  //** run
  run = () => {
    //** update controllers */
    this.barIn.current.style.width = (this.audio.currentTime / this.audio.duration) * 100 + '%';
    const timeRemaining = (this.audio.duration - this.audio.currentTime).toFixed(2);;
    if (!isNaN(timeRemaining)) {
      this.timeRemainingDiv.current.innerHTML = 'Time remaining: ' + timeRemaining;
    }
    
    requestAnimationFrame(this.run.bind(this));
  };
  render() {
    return (
      <div
        ref={this.node}
        className="box-audio-controller">
      <div>
        <PlayBt
          playBtRef={this.playBt}
          playClick={this.playClick}>
        </PlayBt>
        <NextBt
          playNextTrack={this.props.playNextTrack}>
        </NextBt>
      </div>
        <ProgressBar
          barInRef={this.barIn}
          progressBarClick={this.progressBarClick}>
        </ProgressBar>
        <CopySong
          timeRemainingDiv={this.timeRemainingDiv}
          songSelected={this.songSelected}>
        </CopySong>
    </div>
    );
  }
}

export default AudioControllers;
