import React from 'react';
import $ from 'jquery';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

import googleButton from './images/googlebutton.png';
import mainLogo from './images/get-roasted-logo1.png';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then(() => {
        this.props.setAuthBg();
        this.props.history.push('/beans');
      })
      .catch(error => console.error('there was a problem with auth', error));
  }

  setBackground = () => {
    const bgArray = ['bean', 'roast', 'inventories', 'attempt'];
    let counter = 0;

    const nextBackground = () => {
      if (this.props.authBg) {
        document.querySelector('body').className = '';
        $('body').addClass(bgArray[counter]);
        setTimeout(nextBackground, 4000);
        counter += 1;
        if (counter === bgArray.length) { counter = 0; }
      }
    };
    setTimeout(nextBackground, 4000);
    $('body').addClass(bgArray[0]);
  };

  componentDidMount() {
    this.setBackground();
  }

  componentWillUnmount() {
    document.querySelector('body').className = '';
  }

  render() {
    return (
      <div className="Auth mx-auto">
        <div className="text-center logo-container">
          <div className="roasted-logo">
            <img src={mainLogo} alt="main logo" />
          </div>
          <div className="title">
            <h1 className="title1">Get</h1>
            <h1 className="title2">Roasted!!!</h1>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn mt-5 mb-5" onClick={this.authenticateUser}>
            <img src={googleButton} alt="google login button" />
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
