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
            this.setState({ averageRating: totalRating / attempts.length });
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
            <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
          <div className="col">
            <button className="btn btn-default">
              <i className="fas fa-plus-circle" onClick={this.roastClick}>    Attempts</i>
            </button>
          </div>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <span className="col">
            <button className="btn btn-default">
              <i className="fas fa-plus-circle" onClick={this.roastClick}>    Attempts</i>
            </button>
          </span>
        </div>
      );
    };

    return (
      <div className="card col-3 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{roast.roastName}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center lead">{roast.region}</p>
          <p className="card-text text-center">{roast.name}</p>
          <p className="card-text text-center lead">Average Rating: {averageRating}</p>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default RoastCard;
