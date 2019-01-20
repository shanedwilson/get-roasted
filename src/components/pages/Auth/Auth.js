import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

import googleButton from './images/googlebutton.png';
import mainLogo from './images/get-roasted-logo1.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then(() => {
        // this.props.history.push('/beans');
      })
      .catch(error => console.error('there was a problem with auth', error));
  }

  render() {
    return (
      <div className="Auth">
        <div className="logo">
          <img src={mainLogo} alt="main logo" />        
        </div>
        <div className="title">
          <h1 className="title1">Get</h1>
          <h1 className="title2">Roasted!!!</h1>
        </div>
        <button className="btn btn-danger mt-5 mb-5" onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;
