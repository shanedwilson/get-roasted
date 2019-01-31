import React from 'react';
import moment from 'moment';
import SearchField from 'react-search-field';
import AttemptCard from '../../AttemptCard/AttemptCard';
import AttemptsGraph from '../../AttemptsGraph/AttemptsGraph';
import attemptsRequests from '../../../helpers/data/attemptsRequests';
import authRequests from '../../../helpers/data/authRequests';
import roastRequests from '../../../helpers/data/roastRequests';
import beanRequests from '../../../helpers/data/beanRequests';


import './Attempts.scss';

class Attempts extends React.Component {
  state = {
    attempts: [],
    filteredAttempts: [],
    weather: [],
    roast: [],
    bean: [],
    firstCrack: [],
    secondCrack: [],
    end: [],
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

  timeConversion = (time) => {
    const timeSplit = time.split(':');
    let convertedTime = parseInt(timeSplit[0], 10) + (parseInt(timeSplit[1], 10) / 60);
    convertedTime = convertedTime.toFixed(2);
    return (convertedTime);
  }

  graphData = () => {
    const { attempts } = this.state;
    const firstCrack = [];
    const secondCrack = [];
    const end = [];
    attempts.forEach((attempt) => {
      firstCrack.push({
        time: this.timeConversion(attempt.firstTime),
        temp: attempt.firstTemp,
        rating: attempt.rating,
      });
      secondCrack.push({
        time: this.timeConversion(attempt.secondTime),
        temp: attempt.secondTemp,
        rating: attempt.rating,
      });
      end.push({
        time: this.timeConversion(attempt.endTime),
        temp: attempt.endTemp,
        rating: attempt.rating,
      });
    });
    this.setState({ firstCrack, secondCrack, end });
  }

  getAttempts = () => {
    const uid = authRequests.getCurrentUid();
    const firebaseId = this.props.match.params.id;
    const firstCrack = [];
    const secondCrack = [];
    const end = [];
    attemptsRequests.getAllAttemptsByUid(uid, firebaseId)
      .then((attempts) => {
        this.setState({
          attempts, filteredAttempts: attempts, firstCrack, secondCrack, end,
        });
        this.graphData();
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

  onChange = (value, event) => {
    const { attempts } = this.state;
    const filteredAttempts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredInventory: attempts });
    } else {
      attempts.forEach((attempt) => {
        const displayTime = moment(attempt.date).format('MMM DD YYYY hh:mm a');
        if (displayTime.toLowerCase().includes(value.toLowerCase())) {
          filteredAttempts.push(attempt);
        }
        this.setState({ filteredAttempts });
      });
    }
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

    const {
      filteredAttempts, firstCrack, secondCrack, end,
    } = this.state;
    const uid = authRequests.getCurrentUid();

    const attemptCards = filteredAttempts.map(attempt => (
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
        <h1 className="text-center mt-5">ATTEMPTS!!!</h1>
          <SearchField
            placeholder="Search Attempt By Date..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-100"
          />
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
        <div className="graph-container mt-5 mx-auto">
          <AttemptsGraph
          firstCrack={firstCrack}
          secondCrack={secondCrack}
          end={end}
          />
        </div>
      </div>
    );
  }
}

export default Attempts;
