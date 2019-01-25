import React from 'react';
import AttemptCard from '../../AttemptCard/AttemptCard';
import attemptsRequests from '../../../helpers/data/attemptsRequests';
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
        this.setState({ bean: bean.data });
      })
      .catch((error) => {
        console.error('error with single bean GET', error);
      });
  }

  getRoast = () => {
    const firebaseId = this.props.match.params.id;
    roastRequests.getSingleRoast(firebaseId)
      .then((roast) => {
        this.setState({ roast: roast.data });
        this.getBean(roast.data.beanId);
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

  editView = (attemptId) => {
    this.props.history.push(`/attempts/${attemptId}/edit`);
  }

  addView = () => {
    const roastId = this.props.match.params.id;
    this.props.history.push(`/attempts/${roastId}/add`);
  }

  componentDidMount() {
    this.getAttempts();
    this.getRoast();
  }

  deleteSingleAttempt = (attemptId) => {
    attemptsRequests.deleteAttempt(attemptId)
      .then(() => {
        this.getAttempts();
      });
  }

  render() {
    const {
      roast,
      bean,
    } = this.state;

    const { attempts } = this.state;
    const uid = authRequests.getCurrentUid();

    const attemptCards = attempts.map(attempt => (
      <AttemptCard
        key={attempt.id}
        attempt={attempt}
        uid={uid}
        deleteSingleAttempt={this.deleteSingleAttempt}
        onSelect={this.editView}
      />
    ));

    return (
      <div className="Attempts mx-auto w-100">
        <h1 className="text-center">ATTEMPTS!!!</h1>
        <div className="col-5 mx-auto">
          <div className="card col m-3 mx-auto">
            <div className="card-header">
              <h5 className="card-title text-center">{roast.roastName}</h5>
            </div>
            <div className="card-body">
            <p className="card-text text-center">{bean.name}</p>
            </div>
            <div className="mx-auto">
              <span className="col">
                <button className="btn btn-default ml-3" onClick={this.deleteEvent}>
                  Add Attempt   <i className="fas fa-plus-circle" onClick={this.addView}></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="justify-content-center row">{attemptCards}</div>
        </div>
      </div>
    );
  }
}

export default Attempts;
