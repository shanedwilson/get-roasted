import React from 'react';
import PropTypes from 'prop-types';
import inventoryShape from '../../helpers/propz/inventoryShape';

import './InventoryCard.scss';

class InventoryCard extends React.Component {
    static propTypes = {
    inventoryItem: inventoryShape.inventoryShape,
    deleteSingleItem: PropTypes.func,
    passItemToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleItem, item } = this.props;
    deleteSingleItem(item.id);
  }   

  render() {
    const {
      item,
    } = this.props;

    const makeButtons = () => {
        return (
        <div className="mx-auto">
          <span className="col-1">
            <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
          <span className="col-1">
            <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
          <span className="col-1">
            <button className="btn btn-default">
              Roast
              <i className="fas fa-plus-circle ml-2"></i>
            </button>
          </span>
        </div>
        );
      }
    
    return(
      <div className="card col-5 m-3">
        <div className="card-header">
          <h5 className="card-title text-center">{item.name}</h5>
        </div>
        <div className="card-body">
          <p className="card-text text-center">{item.pounds} lbs {item.ounces} oz</p>
        </div>
        {makeButtons()}
      </div>
    )
  }
}

export default InventoryCard;
