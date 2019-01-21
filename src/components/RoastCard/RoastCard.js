import React from 'react';
import PropTypes from 'prop-types';
import roastShape from '../../helpers/propz/roastShape';

import './RoastCard.scss';

class RoastCard extends React.Component {
    static propTypes = {
    roast: roastShape.roastShape,
    deleteSingleRoast: PropTypes.func,
    passBeanToRoast: PropTypes.func,
  }

  render() {
    const {
      roastSmash,
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
      <div className="card col-5 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{roastSmash.roastName}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center">{roastSmash.name}</p>
        </div>
        {makeButtons()}
      </div>
    )
  }
}

export default RoastCard;
