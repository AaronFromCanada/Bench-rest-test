import React, { Component } from 'react';
import logo from './logo.svg';
import Transactions from "./components/Transactions.jsx";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Bench Accounting rest test web app</h2>
        </div>
        <p className="App-intro">
          Click <a href="http://localhost:3000/">here</a> to go back to main page
        </p>
        <Transactions />
      </div>
    );
  }
}

export default App;
