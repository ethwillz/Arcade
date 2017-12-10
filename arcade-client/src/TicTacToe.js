import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';
import io from 'socket.io-client';

class TicTacToe extends Component {
  render() {
    return (
      <Board />
    );
  }
}

class Board extends TicTacToe {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      started: false,
      turn: false,
      partner: undefined,
      socket: io('http://localhost:3002/'),
    };
    this.state.socket.on('user_connected', function(data){
      this.setState({
        partner: data.id,
        turn: data.first,
        started: true
      });
    }.bind(this));
    this.state.socket.on('new_move', function(square){
      let squares = this.state.squares.slice();
      let turn = this.state.turn;
      squares[square] = 'O';
      this.setState({
        squares: squares,
        turn: true,
      });
    }.bind(this));
  }

  handleClick(i){
    let squares = this.state.squares.slice();
    let turn = this.state.turn;
    squares[i] = 'X';
    this.state.socket.emit('new_move', {
      square: i,
      player: this.state.partner,
    });
    this.setState({
      squares: squares,
      turn: false,
    });
  }

  renderSquare(i){
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />;
  }

  render(){
    let clickEnabled = this.state.turn ? 'auto' : 'none';
    return (
      <div className="container">
        <table style={{'pointer-events': clickEnabled}}>
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
