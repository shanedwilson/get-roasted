import React from 'react';
import PropTypes from 'prop-types';
import beanShape from '../../helpers/propz/beanShape';
import authRequests from '../../helpers/data/authRequests';

import './BeanCard.scss';

class BeanCard extends React.Component {
    static propTypes = {
    bean: beanShape.beanShape,
    deleteSingleBean: PropTypes.func,
    passBeanToEdit: PropTypes.func,
  }

  render() {
    const {
      bean,
    } = this.props;  

    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

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
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-plus-circle"></i>
            </button>
          </span>
        </div>
        );
      }
      return  (
        <div className="mx-auto">
          <span className="col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-plus-circle"></i>
            </button>
          </span>
        </div>
          )
    };    
    
    return(
     <div className="card col-3 m-3">
        <img className="card-img-top mt-3" src={bean.imgUrl} alt={bean.name} />
        <div className="card-body">
          <h5 className="card-title text-center">{bean.name}</h5>
          <p className="card-text">{bean.description}</p>
        </div>
        {makeButtons()}
      </div>
    )
  }
}

export default BeanCard;
