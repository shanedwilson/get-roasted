import React from 'react';
import SearchField from 'react-search-field';
import MyModal from '../../MyModal/MyModal';
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
    filteredInventory: [],
    isEditing: false,
    editId: '',
    beanId: '',
    modal: false,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  roastsView = (beanId) => {
    this.props.history.push(`/roasts/${beanId}`);
  }

  setBeanId = () => {
    const firebaseId = this.props.match.params.id;
    this.setState({ beanId: firebaseId });
  }

  getInventory = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getAllInventoryWithBeanInfo(uid)
      .then((inventory) => {
        this.setState({ inventory });
        this.setState({ filteredInventory: inventory });
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

  onChange = (value, event) => {
    const { inventory } = this.state;
    const filteredInventory = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredInventory: inventory });
    } else {
      inventory.forEach((item) => {
        if (item.region.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase())) {
          filteredInventory.push(item);
        }
        this.setState({ filteredInventory });
      });
    }
  }

  componentDidMount() {
    this.setBeanId();
    this.getInventory();
    this.getAllBeans();
  }

  deleteSingleItem = (itemId) => {
    inventoryRequests.deleteItem(itemId)
      .then(() => {
        this.getInventory();
      });
  }

  passItemToEdit = (itemId, beanId) => {
    const { modal } = this.state;
    this.setState({
      isEditing: true,
      editId: itemId,
      beanId,
      modal: !modal,
    });
  }

  setSelect = (selectedBean) => {
    this.setState({ beanId: selectedBean });
  }

  formSubmitEvent = (newInventory) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      inventoryRequests.updateInventory(editId, newInventory)
        .then(() => {
          this.getInventory();
          this.setState({ isEditing: false, beanId: '', modal: false });
        });
    } else {
      inventoryRequests.createInventory(newInventory)
        .then(() => {
          this.getInventory();
          this.setState({ beanId: '', modal: false });
        });
    }
  }

  render() {
    const {
      filteredInventory,
      beans,
      isEditing,
      editId,
      beanId,
      modal,
    } = this.state;

    const inventoryCards = filteredInventory.map(item => (
      <InventoryCard
        key={item.id}
        item={item}
        beanId={beanId}
        passItemToEdit={this.passItemToEdit}
        deleteSingleItem={this.deleteSingleItem}
        onSelect={this.roastsView}
        toggleModal={this.toggleModal}
      />
    ));

    const makeForm = () => (
      <div className='form-container col'>
        <AddEditInventory
          beans={beans}
          isEditing={isEditing}
          editId={editId}
          beanId={beanId}
          onSubmit={this.formSubmitEvent}
          setSelect={this.setSelect}
        />
      </div>
    );


    return (
      <div className="inventory mx-auto mt-5 w-100">
        <h1 className="text-center">INVENTORY!!!</h1>
          <SearchField
            placeholder="Search Inventory By Region or Name..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-100"
          />
          <div>
            <button type="button" className="btn add-btn btn-success my-5 mx-auto" onClick={this.toggleModal}>
              <i className="fas fa-plus-circle" />
            </button>
          </div>
          <div>
            <MyModal
            makeForm = {makeForm()}
            isEditing={isEditing}
            modal={modal}
            toggleModal={this.toggleModal}
            />
          </div>
        <div className="inv-cards row justify-content-center">
          {inventoryCards}
        </div>
      </div>
    );
  }
}

export default Inventory;
