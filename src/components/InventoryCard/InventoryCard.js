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
              <i className="fas fa-plus-circle ml-2" onClick={this.inventoryView}>Roast</i>
            </button>
          </div>
        </div>
    );

    return (
      <div className="card col-3 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{item.name}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center">{item.pounds} lbs {item.ounces} oz</p>
        </div>
        {makeButtons()}
      </div>
    );
  }
}

export default InventoryCard;
