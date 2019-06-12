import React, { Component } from 'react';
import Amplify from 'aws-amplify';

import { Main } from "./components/main";

import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

class App extends Component {

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <Main/>
        </header>
        <div className="App-footer"><span>uses </span><a href='https://sunrise-sunset.org/api'>sunrise-sunset api</a></div>
      </div>
    );
  }
}

export default App;
