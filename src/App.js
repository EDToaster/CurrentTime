import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

class App extends Component {
  state = { time: 0 };

  componentDidMount = async () => {
    const time = Date.now();
    const response = await API.get("timeAPI", `/time/${time}`);
    console.log(response);
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <p>{ this.state.time }</p>
        </header>
      </div>
    );
  }
}

export default App;
