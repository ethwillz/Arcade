import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

class SignUp extends Component {
  state = {users: []}

  authenticate(){
    //TODO Authenticate user and pass to game slection on success
  }

  signUpAndAuthenticate(){
    //TODO sign up user and pass them on to game selection
  }

   render() {
     return (
       <div className="container">
        <form className='card card-outline-info'>
          <label>Username</label>
          <input id='username'></input>
          <label>Email</label>
          <input id='username'></input>
          <label>Password</label>
          <input id='password' type='password'></input>
          <label>Confirm Password</label>
          <input id='password' type='password'></input>
          <button className='btn-primary' onClick={this.authenticate} type='button'>Sign Up</button>
        </form>

        <form id="right" className='card card-outline-info'>
          <label>Username</label>
          <input id='username'></input>
          <label>Password</label>
          <input id='password' type='password'></input>
          <button className='btn-primary' onClick={this.signUpAndAuthenticate} type='button'>Login</button>
        </form>
       </div>
     );
  }
}

export default SignUp
