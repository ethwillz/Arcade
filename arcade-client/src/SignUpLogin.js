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
    fetch('/user/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      }),
    }).then(response => {
      sessionStorage.username = document.getElementById('username').value;
      window.location.href='/game_selection'}
    );
  }

  signUpAndAuthenticate(){
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('su_username').value,
        email: document.getElementById('su_email').value,
        password: document.getElementById('su_password').value,
        confirm_password: document.getElementById('su_confirm_password').value,
      }),
    }).then(response => {
      if(response.status == 432) console.log('Passwords don\'t match');
      else if(response.status == 433) console.log('Username or email already taken');
      else if(response.status == 434) console.log('Email improperly formed');
      else if(response.status == 435) console.log('Username improperly formed');
      else if(response.status == 436) console.log('Password needs to be >8 characters alphanumeric');
      else console.log('Unknown response');
    }).catch(error => console.log(error));
  }

   render() {
     return (
       <div className="container">
        <form className='card card-outline-info'>
          <label>Username</label>
          <input id='su_username'></input>
          <label>Email</label>
          <input id='su_email'></input>
          <label>Password</label>
          <input id='su_password' type='password'></input>
          <label>Confirm Password</label>
          <input id='su_confirm_password' type='password'></input>
          <button className='btn-primary' onClick={this.signUpAndAuthenticate} type='button'>Sign Up</button>
        </form>

        <form id="right" className='card card-outline-info'>
          <label>Username</label>
          <input id='username'></input>
          <label>Password</label>
          <input id='password' type='password'></input>
          <button className='btn-primary' onClick={this.authenticate} type='button'>Login</button>
        </form>
       </div>
     );
  }
}

export default SignUp
