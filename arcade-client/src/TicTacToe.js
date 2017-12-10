import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

class TicTacToe extends Component {
  state = {users: []}

  play(game){
    window.location.href='/play/' + game;
  }

   render() {
     return (
       <h1>Game under construction</h1>
     );
  }
}

export default TicTacToe
