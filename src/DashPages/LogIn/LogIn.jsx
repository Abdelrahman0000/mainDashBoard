
import React, { useState } from 'react';
import './LogIn.css';

export default function LogIn({ setEmail }) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if password is good (you can add your own validation logic here)
    const isPasswordGood = passwordValue.length >= 8;

    if (emailValue=='user@gmail.com'&&passwordValue=='12345678') {
      setEmail(emailValue);
    }
  };

  return (
    <div className="login">
      <div className="main-form">
        <div className="top-inner">
          <h2>Welcome Back</h2>
          <h5>Please log in to continue</h5>
        </div>
        <form onSubmit={handleLogin}>
          <label>
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <span>It must be a combination of minimum 8 letters, numbers, and symbols.</span>
          </label>
          <div className="my-row">
            <label htmlFor="" className="chack-label">
              <input type="checkbox" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <label>
            <button type="submit">Log In</button>
          </label>
        </form>
      </div>
    </div>
  );
}