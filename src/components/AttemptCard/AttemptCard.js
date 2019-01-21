import React from 'react';
import PropTypes from 'prop-types';
import roastShape from '../../helpers/propz/roastShape';

import './AttemptCard.scss';

class AttemptCard extends React.Component {
    static propTypes = {

  }

  render() {
    const {
      attempt,
      uid,
    } = this.props;

    const makeButtons = () => {
        return (
        <div className="mx-auto">
          <span className="col">
            <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-plus-circle"></i>
            </button>
          </span>
        </div>
        );
      }

    return(
      <div className="card col-10 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{attempt.date}</h5>
        </div>
        <div className="card-body" onClick={this.roastClick}>
          <p className="card-text text-center">{attempt.city}, {attempt.state}</p>
          <p className="card-text text-center">
            {attempt.temp}°, {attempt.humidity}% humidity
          </p>
          <p className="card-text text-center">1st Crack: 
             {attempt.firstTime}, {attempt.firstTemp}°
          </p>
          <p className="card-text text-center">2nd Crack:
             {attempt.secondTime}, {attempt.secondTemp}°
          </p>
          <p className="card-text text-center">Notes: {attempt.notes}</p>
          <p className="card-text text-center">Rating: {attempt.rating}</p>
      </div>
        {makeButtons()}
      </div>
    )
  }
}

export default AttemptCard;
