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
    alert('button successful');
  }

  signUpAndAuthenticate(){
    alert('hello');
      fetch('/user', {
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
      });
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
