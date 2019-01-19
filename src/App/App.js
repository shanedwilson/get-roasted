import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Auth from '../components/pages/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
// import weatherRequests from '../helpers/data/weatherRequests';
import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

import './App.scss';

const PublicRoute = ({component: Component, authed, ...rest}) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/beans', state: { from: props.location} }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }  

  // getWeather = (position) => {
  //   const lat = position.coords.latitude;
  //   const lon = position.coords.longitude;
  //   weatherRequests.getCurrentWeather(lat, lon)
  //     .then((weather) => {
  //       console.log('weather data: ', weather)
  //     })
  //     .catch((err) => {
  //       console.error('error with weather GET', err);
  //     });  
  // }  

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      pendingUser,
    } = this.state; 

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }      
    return (
      <div className="App text-center">
        <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
        <Auth />
        {/* <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className='row'>
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch> 
              </div>
            </div>                           
          </React.Fragment>
        </BrowserRouter> */}
      </div>
    );
  }
}

export default App;
