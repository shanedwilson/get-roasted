import React from 'react';
import inventoryRequests from '../../../helpers/data/inventoryRequests'
import authRequests from '../../../helpers/data/authRequests';
import beanRequests from '../../../helpers/data/beanRequests';


import './Inventory.scss';

class Inventory extends React.Component {
  state = {
    inventory: [],
    beanIds: [],
  }

  getInventory = () => {
    beanRequests.getBeansByArrayOfIds(this.state.beanIds)
    .then((inventory) => {
      this.setState({ inventory })
    })
    .catch((error) => {
      console.error('error with inventory GET', error);
    })
  }

  getBeanIds = () => {
    const uid = authRequests.getCurrentUid();
    inventoryRequests.getBeanIdsForInventory(uid)
    .then((beanIds) => {
      this.setState({ beanIds });
    })
    .then(() => {
      this.getInventory();
    })
    .catch((error) => {
      console.error('error with inventory bean ids GET', error);
    })
  };

  componentDidMount() {
    this.getBeanIds();
  }

  render() {

    return (
      <div className="inventory mx-auto">
        <h1>INVENTORY!!!</h1>
      </div>
    )
  }
}

export default Inventory;
