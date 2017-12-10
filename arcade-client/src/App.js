import React, { Component } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Link
} from 'react-router-dom'
import SignUpLogin from './SignUpLogin';
import GameSelection from './GameSelection';
import TicTacToe from './TicTacToe'

class App extends Component {
  state = {users: []}

   componentDidMount() {
     /*fetch('/users')
       .then(res => res.json())
       .then(users => this.setState({ users }));*/
   }

   render() {
     return (
       <BrowserRouter>
         <div id="router">
           <Route path="/index" component={SignUpLogin}/>
           <Route path="/game_selection" component={GameSelection}/>
           <Route path="/play/tic_tac_toe" component={TicTacToe}/>
         </div>
       </BrowserRouter>
     );
  }
}

export default App
