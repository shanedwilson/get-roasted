import React from 'react';
import PropTypes from 'prop-types';
import roastShape from '../../helpers/propz/roastShape';
import attemptsRequests from '../../helpers/data/attemptsRequests';

import './RoastCard.scss';

class RoastCard extends React.Component {
  state = {
    averageRating: 0,
  }

  static propTypes = {
    roast: roastShape.roastShape,
    deleteSingleRoast: PropTypes.func,
    passRoastToEdit: PropTypes.func,
    onSelect: PropTypes.func,
    roasts: PropTypes.array,
  }

  getAttempts = () => {
    const roastId = this.props.roast.id;
    let totalRating = 0;
    attemptsRequests.getAllAttemptsByRoastId(roastId)
      .then((attempts) => {
        (attempts.length === 0 ? this.setState({ averageRating: 0 })
          : attempts.forEach((attempt) => {
            totalRating += attempt.rating;
            this.setState({ averageRating: (totalRating / attempts.length).toFixed(2) });
          }));
      })
      .catch((error) => {
        console.error('error with attempts GET', error);
      });
  };

  roastClick = (e) => {
    e.stopPropagation();
    const { roast, onSelect } = this.props;
    onSelect(roast.id);
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleRoast, roast } = this.props;
    deleteSingleRoast(roast.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passRoastToEdit, roast } = this.props;
    passRoastToEdit(roast.id, roast.beanId);
  }

  componentDidMount() {
    this.getAttempts();
  }

  render() {
    const {
      roast,
      uid,
      ownerUid,
    } = this.props;

    const {
      averageRating,
    } = this.state;

    const makeButtons = () => {
      if (uid === ownerUid) {
        return (
        <div className="mx-auto">
          <span className="col">
            <button className="btn edit-btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="btn delete-btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
          <div className="col">
            <button className="btn card-add-btn btn-default">
              <i className="fas fa-plus-circle" onClick={this.roastClick}>    Attempts</i>
            </button>
          </div>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <span className="col">
            <button className="btn card-add-btn btn-default">
              <i className="fas fa-plus-circle" onClick={this.roastClick}>    Attempts</i>
            </button>
          </span>
        </div>
      );
    };

    return (
      <div className="card roast-card col-3 m-3 rounded">
        <div className="card-header roast-card-header mt-3 h-25 text-center d-flex rounded">
          <h5 className="card-title mx-auto m-0">{roast.roastName}</h5>
        </div>
        <div className="card-body d-flex flex-column text-center justify-content-center">
          <p className="card-text lead">{roast.origin}</p>
          <p className="card-text ">{roast.name}</p>
          <div className="average-div">
            <p className="card-text lead">Average Rating: {averageRating}</p>
          </div>
        </div>
        <div className="card-footer text-center">
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default RoastCard;
