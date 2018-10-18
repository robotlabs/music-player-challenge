import React, { Component } from 'react';
import './style.css';

const test = [
  {
    'title': 'a1'
  },
  {
    'title': 'a2'
  },
  {
    'title': 'a3'
  }
]
class App extends Component {

  render() {
    let listSubItems = <div></div>;
    listSubItems  = this.props.songs.map((item, index) => {
      return (
        <li
          onClick = { () => {
            this.closeButton();
            this.props.passSubClick(this, item);
          }}
          key={index}>
          <a>{item.title}</a>
        </li>
      );
    });

    return (
      <div
        className="box-song-list">
        {listSubItems}
        </div>
    );
  }
}

export default App;
