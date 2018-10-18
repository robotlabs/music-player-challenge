import React, { Component } from 'react';
import './style.css';

class AudioControllers extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.barIn = React.createRef();
    this.playBt = React.createRef();
    this.state = {
      play: false
    }
    this.url = "./mp3/milanocalibro9.mp3";
    this.audio = new Audio(this.url);
  }
  componentDidMount() {
    this.audio.addEventListener("timeupdate", () => {
      //console.log('this.audio.progress ', this.audio.currentTime);
      //console.log('this.audio.progress ', this.audio.duration);
      //this.barIn.style.width = (this.audio.currentTime / this.audio.duration) * 100 + '%';
    });
    this.audio.addEventListener("ended", () => {
      console.log('this.audio.ended ', this.audio.currentTime);
    });
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

  barClick = (e) => {
    console.log('e ', e);
    let rect = e.target.getBoundingClientRect();
    console.log(rect);
    let x = e.clientX - rect.left; 
    let percW = x / rect.width;
    this.audio.currentTime = this.audio.duration * (percW);
    console.log(this.audio.currentTime);
  }

  //** run
  run = () => {
    // console.log('this.audio.currentTime ', this.audio.currentTime);
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
      </div>
      <div>
        <div 
          className='bar-outer'
          onClick={this.barClick}>
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
