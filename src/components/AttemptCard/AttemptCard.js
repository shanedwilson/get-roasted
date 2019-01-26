import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import attemptShape from '../../helpers/propz/atttemptShape';

import './AttemptCard.scss';

class AttemptCard extends React.Component {
    static propTypes = {
      attempt: attemptShape.attemptShape,
      deleteSingleAttempt: PropTypes.func,
      passAttemptToEdit: PropTypes.func,
      onSelect: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleAttempt, attempt } = this.props;
    deleteSingleAttempt(attempt.id);
  }

  editEvent = (e) => {
    e.stopPropagation();
    const { attempt, onSelect } = this.props;
    onSelect(attempt.id);
  }

  render() {
    const {
      attempt,
    } = this.props;

    const makeButtons = () => (
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
        </div>
    );

    return (
      <div className="card col-3 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{moment(attempt.date).format('MMM DD YYYY hh:mm a')}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center">{attempt.city}, {attempt.state}</p>
          <p className="card-text text-center">
            {attempt.temp} °F, {attempt.humidity}% relative humidity
          </p>
          <p className="card-text text-center">1st Crack:
             {attempt.firstTime}, {attempt.firstTemp} °F
          </p>
          <p className="card-text text-center">2nd Crack:
             {attempt.secondTime}, {attempt.secondTemp} °F
          </p>
          <p className="card-text text-center">Notes: {attempt.notes}</p>
          <p className="card-text text-center lead">Rating: {attempt.rating}</p>
      </div>
        {makeButtons()}
      </div>
    );
  }
}

export default AttemptCard;
