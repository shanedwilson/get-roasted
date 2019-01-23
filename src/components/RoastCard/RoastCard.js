import React from 'react';
import PropTypes from 'prop-types';
// import roastShape from '../../helpers/propz/roastShape';

import './RoastCard.scss';

class RoastCard extends React.Component {
    static propTypes = {
      // roast: roastShape.roastShape,
      deleteSingleRoast: PropTypes.func,
      passBeanToRoast: PropTypes.func,
      onSelect: PropTypes.func,
    }

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

  render() {
    const {
      roast,
      uid,
      ownerUid,
    } = this.props;

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
          <span className="col">
            <button className="btn btn-default">
              <i className="fas fa-plus-circle"></i>
            </button>
          </span>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <span className="col">
            <button className="btn btn-default">
              <i className="fas fa-plus-circle"></i>
            </button>
          </span>
        </div>
      );
    };

    return (
      <div className="card col-5 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{roast.roastName}</h5>
        </div>
        <div className="card-body" onClick={this.roastClick}>
          <p className="card-text text-center">{roast.name}</p>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default RoastCard;
