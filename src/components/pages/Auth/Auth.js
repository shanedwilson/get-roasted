import React from 'react';
import $ from 'jquery';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

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
    const bgArray = ['bean', 'inventories', 'roast', 'attempt'];
    let counter = 0;

    const nextBackground = () => {
      if (this.props.authBg) {
        document.querySelector('body').className = '';
        $('body').addClass(bgArray[counter]);
        setTimeout(nextBackground, 3000);
        counter += 1;
        if (counter === bgArray.length) { counter = 0; }
      }
    };
    nextBackground();
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
        </div>
        <div className="btn-container mt-5">
          <button className="bttn-pill bttn-lg bttn-danger" onClick={this.authenticateUser}>
            <i className="fab fa-google"></i> Sign In w/Google
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
