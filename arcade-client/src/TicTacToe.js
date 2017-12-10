import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

class TicTacToe extends Component {
  state = {users: []}

   render() {
     return (
       <Board />
     );
  }
}

class Board extends Component {
  renderSquare(i){
    return <Square value={i} />;
  }

  render(){
    return (
      <div className="container">
        <table>
          <div className="tr">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="tr">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="tr">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </table>
      </div>
    );
  }
}

class Square extends Component {
  render(){
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

export default TicTacToe
