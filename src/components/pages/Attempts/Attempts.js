import React from 'react';
import AttemptCard from '../../AttemptCard/AttemptCard';
import attemptsRequests from '../../../helpers/data/attemptsRequests';
import weatherRequests from '../../../helpers/data/weatherRequests';
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

    const { attempts } = this.state;
    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const attemptCards = attempts.map(attempt => (
      <AttemptCard 
        key={attempt.id}
        attempt={attempt}
        uid={uid}
      />
    ));         

    return (
      <div className="Attempts mx-auto">
        <h1 className="text-center">ATTEMPTS!!!</h1>
        <div className="card col-10 m-3 mx-auto">
          <div className="card-header">
            <h5 className="card-title text-center">{roast.roastName}</h5>
          </div>
          <div className="card-body">
          <p className="card-text text-center">{bean.name}</p>
          </div>
        </div>
        <div>{attemptCards}</div>
      </div>
    )
  }
}

export default Attempts;
