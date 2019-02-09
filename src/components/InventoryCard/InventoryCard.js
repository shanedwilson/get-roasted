import React from 'react';
import PropTypes from 'prop-types';
import inventoryShape from '../../helpers/propz/inventoryShape';

import './InventoryCard.scss';

class InventoryCard extends React.Component {
    static propTypes = {
      item: inventoryShape.inventoryShape,
      deleteSingleItem: PropTypes.func,
      passItemToEdit: PropTypes.func,
      onSelect: PropTypes.func,
      onToggle: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleItem, item } = this.props;
    deleteSingleItem(item.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passItemToEdit, item } = this.props;
    passItemToEdit(item.id, item.beanId);
  }

  roastView = (e) => {
    e.stopPropagation();
    const { item, onSelect } = this.props;
    onSelect(item.beanId);
  }

  render() {
    const {
      item,
    } = this.props;

    const makeButtons = () => (
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
            <button className="bttn-stretch bttn-sm bttn-success mt-3 mb-3" onClick={this.roastView}>
              <i className="fas fa-plus-circle">    Roast</i>
            </button>
          </div>
        </div>
    );

    const makeAmount = () => {
      if (item.pounds < 2) {
        return (
          <div className="amt-div text-danger">
            <p className="card-text font-weight-bold lead">Amount Available:</p>
            <p className="card-text font-weight-bold lead">{item.pounds} lbs {item.ounces} oz</p>
          </div>
        );
      }
      return (
          <div className="amt-div">
            <p className="card-text font-weight-bold lead">Amount Available:</p>
            <p className="card-text font-weight-bold lead">{item.pounds} lbs {item.ounces} oz</p>
          </div>
      );
    };

    return (
      <div className="card inventory-card col-3 m-3 text-center rounded">
        <div className="card-header inventory-card-header mt-3 h-25 d-flex rounded">
          <h5 className="card-title mx-auto">{item.name}</h5>
        </div>
        <div className="card-body  text-center">
          <p className="font-weight-bold lead">{item.origin}</p>
          <p className="card-text">{item.description}</p>
          {/* <div className="amt-div">
            <p className="card-text font-weight-bold lead">Amount Available:</p>
            <p className="card-text font-weight-bold lead">{item.pounds} lbs {item.ounces} oz</p>
          </div> */}
          {makeAmount()}
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default InventoryCard;
