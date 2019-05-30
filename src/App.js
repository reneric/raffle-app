import React, { Component } from "react";
import ListTextArea from './components/listTextArea';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="container-inner">
          <h1>Raffle Generator</h1>
          <div>
          <ListTextArea/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;