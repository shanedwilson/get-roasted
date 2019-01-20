import React from 'react';
import InventoryCard from '../../InventoryCard/InventoryCard';
import authRequests from '../../../helpers/data/authRequests';
import smashDataRequests from '../../../helpers/data/smashDataRequests';


import './Inventory.scss';

class Inventory extends React.Component {
  state = {
    inventory: [],
  }

  getInventory = () => {
  const uid = authRequests.getCurrentUid();
   smashDataRequests.getAllInventoryWithBeanInfo(uid)
    .then((inventory) => {
      this.setState({ inventory })
    })
    .catch((error) => {
      console.error('error with inventory GET', error);
    })    
  }

  componentDidMount() {
    this.getInventory();
  }

  render() {
    const { inventory } = this.state;

    const inventoryCards = inventory.map(item => (
      <InventoryCard 
        key={item.id}
        item={item}
      />
    ));    


    return (
      <div className="inventory mx-auto">
        <h1 className="text-center">INVENTORY!!!</h1>
        <div className="row justify-content-center">
          {inventoryCards}
        </div>
      </div>
    )
  }
}

export default Inventory;
