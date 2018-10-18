import React, { Component } from 'react';
import './style.css';

class AudioControllers extends Component {
  constructor(props) {
    super(props);
    //** create refs */
    this.node = React.createRef();
    this.barIn = React.createRef();
    this.playBt = React.createRef();
    this.timeRemainingDiv = React.createRef();
    //** init state */
    this.state = {
      play: false
    }
    //** init class stuff */
    this.urlBase = "./mp3/";
    this.audio = new Audio();
    /* load track. pause is default as false */
    this.playTrack(this.props);
  }
  componentDidMount() {
    this.audio.addEventListener("ended", () => {
      //** play next in the list */
      this.props.playNextTrack();
    });
    
    /* start request animation frame */
    this.run();
  }

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

  progressBarClick = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; 
    let percW = x / rect.width;
    this.audio.currentTime = this.audio.duration * (percW);
  }

  playTrack(props) {
    this.songSelected = this.props.songListData[props.songSelected];
    console.log('this song ', this.songSelected);
    let url = this.urlBase + this.songSelected.file;
    if (this.audio) {
      this.audio.src = url;
      if (this.state.play) {
        this.audio.play()
      }
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.songSelected !== this.props.songSelected) {
      this.playTrack(nextProps);
    }
  }
  //** run
  run = () => {
    this.barIn.current.style.width = (this.audio.currentTime / this.audio.duration) * 100 + '%';
    let timeRemaining = (this.audio.duration - this.audio.currentTime).toFixed(2);;
    if (!isNaN(timeRemaining)) {
      this.timeRemainingDiv.current.innerHTML = timeRemaining;
    }
    
    requestAnimationFrame(this.run.bind(this));
  };
  render() {
    console.log(this.songSelected.title);
    return (
      <div
        ref={this.node}
        className="box-audio-controller">
      <div>
        <div 
          ref={this.playBt}
          className='play-pause'
          onClick={this.playClick}>
        </div>
        <div
          className='ff-outer'
          onClick={this.props.playNextTrack}>
          <div 
            className='ff ff1'>
          </div>
          <div 
            className='ff ff2'>
          </div>
        </div>
      </div>
        <div 
          className='bar-outer'
          onClick={this.progressBarClick}>
          <div 
            className='bar'>
            <div 
              ref={this.barIn}
              className='bar-in'>
            </div>
          </div>
        </div>
        <div
          className='copy-song'>
          {this.songSelected.title}
        </div>
        <div
          ref={this.timeRemainingDiv}
          className='time-remaining'>
        </div>
    </div>
    );
  }
}

export default AudioControllers;
