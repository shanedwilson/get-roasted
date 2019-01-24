import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from '../components/pages/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Beans from '../components/pages/Beans/Beans';
import Roasts from '../components/pages/Roasts/Roasts';
import Inventory from '../components/pages/Inventory/Inventory';
import Attempts from '../components/pages/Attempts/Attempts';
import AddAttempts from '../components/pages/AddAttempts/AddAttempts';
import EditAttempts from '../components/pages/EditAttempts/EditAttempts';
import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/beans', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

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
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className='row'>
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                  <PrivateRoute path='/' exact component={Beans} authed={this.state.authed} />
                  <PrivateRoute path='/beans' component={Beans} authed={this.state.authed} />
                  <PrivateRoute path='/roasts' component={Roasts} authed={this.state.authed} />
                  <PrivateRoute exact path='/inventory' component={Inventory} authed={this.state.authed} />
                  <PrivateRoute path='/inventory/:id' component={Inventory} authed={this.state.authed} />
                  <PrivateRoute exact path='/attempts/:id/add' component={AddAttempts} authed={this.state.authed} />
                  <PrivateRoute exact path='/attempts/:id/edit' component={EditAttempts} authed={this.state.authed} />
                  <PrivateRoute exact path='/attempts/:id' component={Attempts} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
