import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
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
    const { attempt, passAttemptToEdit } = this.props;
    passAttemptToEdit(attempt.id);
  }

  render() {
    const {
      attempt,
    } = this.props;

    const makeButtons = () => (
        <div className="mx-auto mb-3">
          <span className="col">
           <button className="bttn-material-circle bttn-sm bttn-warning" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="bttn-material-circle bttn-sm bttn-danger"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.deleteEvent}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        </div>
    );

    return (
      <div className="card attempt-card col-3 m-3 rounded">
        <div className="card-header attempt-card-header rounded mt-3">
          <h5 className="card-title text-center">{moment(attempt.date).format('MMM DD YYYY hh:mm a')}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center">{attempt.city}, {attempt.state}</p>
          <p className="card-text text-center">
            {attempt.temp} °F, {attempt.humidity}% relative humidity
          </p>
          <p className="card-text text-center">1st Crack:  {attempt.firstTime}, {attempt.firstTemp} °F
          </p>
          <p className="card-text text-center">2nd Crack:  {attempt.secondTime}, {attempt.secondTemp} °F
          </p>
          <p className="card-text text-center">End:  {attempt.endTime}, {attempt.endTemp} °F
          </p>
          <p className="card-text text-center">Notes: {attempt.notes}</p>
          <div className="text-center">
            <StarRatingComponent
              name="attempt-rating"
              editing={false}
              starCount={10}
              value={attempt.rating}
              renderStarIcon={() => <span><i className="fas fa-coffee"></i></span>}
            />
          </div>
      </div>
        {makeButtons()}
      </div>
    );
  }
}

export default AttemptCard;
