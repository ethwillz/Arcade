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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turn: 'X',
    };
  }

  handleClick(i){
    let squares = this.state.squares.slice();
    let turn = this.state.turn;
    squares[i] = turn;
    if(turn === 'X') turn = 'O';
    else turn = 'X';
    this.setState({squares: squares});
    this.setState({turn: turn});
  }

  renderSquare(i){
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />;
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
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export default TicTacToe
