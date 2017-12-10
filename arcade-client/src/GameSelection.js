import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

class GameSelection extends Component {
  state = {users: []}

  play(game){
    window.location.href='/play/' + game;
  }

   render() {
     return (
       <div className="container">
        <div id="game-card" className='card card-outline-info' onClick={this.play.bind(this, 'tic_tac_toe')}>
          <h3>Tic Tac Toe</h3>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/2000px-Tic_tac_toe.svg.png"/>
        </div>
       </div>
     );
  }
}

export default GameSelection
