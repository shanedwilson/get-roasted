import React from 'react';
import attemptsRequests from '../../../helpers/data/attemptsRequests'
import weatherRequests from '../../../helpers/data/weatherRequests'
import authRequests from '../../../helpers/data/authRequests';

import './Attempts.scss';

class Attempts extends React.Component {
  state = {
    attempts: [],
    weather: [],
  }

  getAttempts = () => {
    const uid = authRequests.getCurrentUid();
    attemptsRequests.getAllAttempts(uid)
    .then((attempts) => {
      this.setState({ attempts });
    })
  };

  getWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    weatherRequests.getCurrentWeather(lat, lon)
      .then((weather) => {
        this.setState({ weather })
      })
      .catch((err) => {
        console.error('error with weather GET', err);
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
    navigator.geolocation.getCurrentPosition(this.getWeather)    
  }  

  render() {

    console.log(this.state.attempts);

    return (
      <div className="Attempts mx-auto">
        <h1>ATTEMPTS!!!</h1>
        <button className="btn btn-success" id="13579" onClick={this.addView}>Go To Attempts Add</button>
        <button className="btn btn-primary" id="246810" onClick={this.editView}>Go To Attempts Edit</button>
      </div>
    )
  }
}

export default Attempts;
