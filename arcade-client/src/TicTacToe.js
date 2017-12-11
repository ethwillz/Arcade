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
      gameState: 'Waiting for other player',
    };
    this.state.socket.on('user_connected', function(data){
      this.setState({
        partner: data.id,
        turn: data.first,
        started: true,
        gameState: data.first ? 'Your turn!' : 'Your opponent\'s turn',
      });
    }.bind(this));
    this.state.socket.on('new_move', function(square){
      let squares = this.state.squares.slice();
      let turn = this.state.turn;
      squares[square] = 'O';
      this.setState({squares: squares});
      if(this.checkWin()){
        this.setState({
          turn: false,
          gameState: 'You lose :('
        });
      }
      else{
        this.setState({
          turn: true,
          gameState: 'Your turn!'
        });
      }
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
      turn: false,
      squares: squares,
      },
      this.update
    );
  }

  update(){
    if(this.checkWin()) this.setState({gameState: 'You win :)'});
    else this.setState({gameState: 'Your opponent\'s turn',});
  }

  checkWin(){
    for(var i = 0; i < 7; i+=3){ if(this.checkRow(i)) return true; }
    for(var i = 0; i < 3; i++){ if(this.checkColumn(i)) return true;; }
    return this.checkDiagonals();
  }

  checkRow(square){
    var toMatch = this.state.squares[square] == null ? 'Z' : this.state.squares[square];
    for(var i = square + 1; i < square + 3; i++){
      if(this.state.squares[i] !== toMatch) return false;
    }
    return true;
  }

  checkColumn(square){
    var toMatch = this.state.squares[square] == null ? 'Z' : this.state.squares[square];
    for(var i = square + 3; i < square + 7; i+=3){
      if(this.state.squares[i] !== toMatch) return false;
    }
    return true;
  }

  checkDiagonals(){
    let sqs = this.state.squares;
    if(sqs[0] === sqs[4] && sqs[4] === sqs[8] && sqs[4] != null) return true;
    if(sqs[2] == sqs[4] && sqs[4] === sqs[6] && sqs[4] != null) return true;
    return false;
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
        <div className="board-and-message">
          <h3>{this.state.gameState}</h3>
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
