import React from 'react';
import attemptsRequests from '../../../helpers/data/attemptsRequests'
import weatherRequests from '../../../helpers/data/weatherRequests'
import authRequests from '../../../helpers/data/authRequests';
import roastRequests from '../../../helpers/data/roastRequests';
import beanRequests from '../../../helpers/data/beanRequests';


import './Attempts.scss';

class Attempts extends React.Component {
  state = {
    attempts: [],
    weather: [],
    roast: [],
    bean: [],
  }

  getBean = (beanId) => {
    beanRequests.getSingleBean(beanId)
    .then((bean) => {
      this.setState({ bean });
    })
    .catch((error) => {
      console.error('error with single bean GET', error);
    }); 
  }

  getRoast = () => {
    const firebaseId = this.props.match.params.id;
    roastRequests.getSingleRoast(firebaseId)
    .then((roast) => {
      this.setState({ roast })
      this.getBean(roast.beanId);
    })
    .catch((error) => {
      console.error('error with single roast GET', error);
    });     
  }  

  getAttempts = () => {
    const uid = authRequests.getCurrentUid();
    const firebaseId = this.props.match.params.id;
    attemptsRequests.getAllAttempts(uid, firebaseId)
    .then((attempts) => {
      this.setState({ attempts });
    })
    .catch((error) => {
      console.error('error with attempts GET', error);
    });     
  };

  getWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    weatherRequests.getCurrentWeather(lat, lon)
      .then((weather) => {
        this.setState({ weather })
      })
      .catch((error) => {
        console.error('error with weather GET', error);
      });
  } 

  addView = (e) => {
    const attemptId = e.target.id;
    this.props.history.push(`/attempts/${attemptId}/add`);
  }  

  editView = (e) => {
    const attemptId = e.target.id;
    this.props.history.push(`/attempts/${attemptId}/edit`);
  } 

  componentDidMount() {
    this.getAttempts();
    navigator.geolocation.getCurrentPosition(this.getWeather);
    this.getRoast();
  }  

  render() {
    const {
      roast,
      bean,
    } = this.state

    return (
      <div className="Attempts mx-auto">
        <h1>ATTEMPTS!!!</h1>
        <button className="btn btn-success" id="13579" onClick={this.addView}>Go To Attempts Add</button>
        <button className="btn btn-primary" id="246810" onClick={this.editView}>Go To Attempts Edit</button>
        <div className="card col-10 m-3">
          <div className="card-header">
            <h5 className="card-title text-center">{roast.roastName}</h5>
          </div>
          <div className="card-body">
          <p className="card-text text-center">{bean.name}</p>
          </div>
        </div>        
      </div>
    )
  }
}

export default Attempts;
