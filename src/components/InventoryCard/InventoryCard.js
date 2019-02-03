import React from 'react';
import PropTypes from 'prop-types';
import inventoryShape from '../../helpers/propz/inventoryShape';

import './InventoryCard.scss';

class InventoryCard extends React.Component {
    static propTypes = {
      inventoryItem: inventoryShape.inventoryShape,
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

  inventoryView = (e) => {
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
            <button className="btn btn-default text-center">
              <i className="fas fa-plus-circle ml-2" onClick={this.inventoryView}>    Roast</i>
            </button>
          </div>
        </div>
    );

    return (
      <div className="card inventory-card col-3 m-3 text-center">
        <div className="card-header inventory-card-header h-25 d-flex">
          <h5 className="card-title mx-auto">{item.name}</h5>
        </div>
        <div className="card-body  text-center">
          <h6>{item.region}</h6>
          <p className="card-text">{item.description}</p>
          <div>
            <p className="card-text font-weight-bold lead">Amount Available:</p>
            <p className="card-text font-weight-bold lead">{item.pounds} lbs {item.ounces} oz</p>
          </div>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default InventoryCard;
