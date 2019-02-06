import React from 'react';
import PropTypes from 'prop-types';
import beanShape from '../../helpers/propz/beanShape';

import './BeanCard.scss';

class BeanCard extends React.Component {
    static propTypes = {
      bean: beanShape.beanShape,
      deleteSingleBean: PropTypes.func,
      passBeanToEdit: PropTypes.func,
      onSelect: PropTypes.func,
      onToggle: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBean, bean } = this.props;
    deleteSingleBean(bean.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passBeanToEdit, bean } = this.props;
    passBeanToEdit(bean.id);
  }

  inventoryView = (e) => {
    e.stopPropagation();
    const { bean, onSelect } = this.props;
    onSelect(bean.id);
  }

  render() {
    const {
      bean,
      uid,
      ownerUid,
    } = this.props;

    const makeButtons = () => {
      if (uid === ownerUid) {
        return (
        <div className="text-center">
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
          <div className="col">
            <button className="bttn-stretch bttn-sm bttn-success mt-3 mb-3" onClick={this.inventoryView}>
              <i className="fas fa-plus-circle">    Inventory</i>
            </button>
          </div>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <span className="col">
            <button className="bttn-stretch bttn-sm bttn-success mt-3 mb-3" onClick={this.inventoryView}>
              <i className="fas fa-plus-circle">    Inventory</i>
            </button>
          </span>
        </div>
      );
    };

    return (
     <div className="card bean-card col-3 m-3 rounded">
        <div className="card-header bean-card-header mt-3 h-10 d-flex rounded">
          <h5 className="card-title mx-auto">{bean.origin}</h5>
        </div>
        <img className="card-img-top mt-3 rounded" src={bean.imgUrl} alt={bean.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{bean.name}</h5>
          <p className="card-text">{bean.description}</p>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default BeanCard;
