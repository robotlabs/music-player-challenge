import React, { Component } from 'react';
import './style.css';

class AudioControllers extends Component {
  constructor(props) {
    super(props);
    //** create refs */
    this.node = React.createRef();
    this.barIn = React.createRef();
    this.playBt = React.createRef();
    //** init state */
    this.state = {
      play: false
    }
    //** init class stuff */
    this.urlBase = "./mp3/";
    this.audio = new Audio();
  }
  componentDidMount() {
    this.audio.addEventListener("ended", () => {
      //** play next in the list */
      this.props.playNextTrack();
    });
    /* load track. pause is default as false */
    this.playTrack(this.props);
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
    let url = this.urlBase + this.props.songListData[props.songSelected].file;
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
    requestAnimationFrame(this.run.bind(this));
  };
  render() {
    
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
            ref={this.xx1}
            className='ff ff1'
            onClick={this.xx}>
          </div>
          <div 
            ref={this.xx2}
            className='ff ff2'
            onClick={this.xx}>
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
    );
  }
}

export default AudioControllers;
