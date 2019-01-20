import React from 'react';
import inventoryRequests from '../../../helpers/data/inventoryRequests'
import authRequests from '../../../helpers/data/authRequests';

import './Inventory.scss';

class Inventory extends React.Component {
  state = {
    inventory: [],
  }

  getInventory = () => {
    const uid = authRequests.getCurrentUid();
    inventoryRequests.getAllInventory(uid)
    .then((inventory) => {
      this.setState({ inventory });
    })
  };

  componentDidMount() {
    this.getInventory();
  }

  render() {
    console.log(this.state.inventory);

    return (
      <div className="inventory mx-auto">
        <h1>INVENTORY!!!</h1>
      </div>
    )
  }
}

export default Inventory;
