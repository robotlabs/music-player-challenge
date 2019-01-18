import React from 'react';
export const PlayBt = (props) => (
  <div 
    ref={props.playBtRef}
    className='play-pause'
    onClick={props.playClick}>
  </div>
);
export const NextBt = (props) => (
  <div
    className='ff-outer'
    onClick={props.playNextTrack}>
    <div 
      className='ff ff1'>
    </div>
    <div 
      className='ff ff2'>
    </div>
  </div>
);
export const ProgressBar = (props) => (
  <div 
    className='bar-outer'
    onClick={props.progressBarClick}>
    <div 
      className='bar'>
      <div 
        ref={props.barInRef}
        className='bar-in'>
      </div>
    </div>
  </div>
);
export const CopySong = (props) => (
  <div>
    <div
      className='copy-song'>
      {props.songSelected.title}
    </div>
    <div
      ref={props.timeRemainingDiv}
      className='time-remaining'>
    </div>
  </div>
);