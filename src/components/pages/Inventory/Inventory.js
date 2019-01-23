import React from 'react';
import InventoryCard from '../../InventoryCard/InventoryCard';
import authRequests from '../../../helpers/data/authRequests';
import smashDataRequests from '../../../helpers/data/smashDataRequests';
import beanRequests from '../../../helpers/data/beanRequests';
import inventoryRequests from '../../../helpers/data/inventoryRequests';
import AddEditInventory from '../../AddEditInventory/AddEditInventory';

import './Inventory.scss';

class Inventory extends React.Component {
  state = {
    inventory: [],
    beans: [],
  }

  getInventory = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getAllInventoryWithBeanInfo(uid)
      .then((inventory) => {
        this.setState({ inventory });
      })
      .catch((error) => {
        console.error('error with inventory GET', error);
      });
  }

  getAllBeans = () => {
    beanRequests.getAllBeans()
      .then((beans) => {
        this.setState({ beans });
      });
  }

  componentDidMount() {
    this.getInventory();
    this.getAllBeans();
  }

  deleteSingleItem = (itemId) => {
    inventoryRequests.deleteItem(itemId)
      .then(() => {
        this.getInventory();
      });
  }

  render() {
    const { inventory, beans } = this.state;

    const inventoryCards = inventory.map(item => (
      <InventoryCard
        key={item.id}
        item={item}
        deleteSingleItem={this.deleteSingleItem}
      />
    ));


    return (
      <div className="inventory mx-auto">
        <h1 className="text-center">INVENTORY!!!</h1>
        <div><AddEditInventory beans={beans} /></div>
        <div className="row justify-content-center">
          {inventoryCards}
        </div>
      </div>
    );
  }
}

export default Inventory;
