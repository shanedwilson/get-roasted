import React from 'react';
import $ from 'jquery';
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
    view: 'Inventory',
    isSearching: false,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
      isEditing: false,
      beanId: '',
    });
  }

  toggleSearch = () => {
    const { isSearching } = this.state;
    this.setState({ isSearching: !isSearching });
  }

  onEnter = () => {
    const { inventory } = this.state;
    this.setState({ isSearching: false, filteredInventory: inventory });
  }

  onSearchClick = () => {
    const { inventory } = this.state;
    this.setState({ isSearching: false, filteredInventory: inventory });
  }

  roastsView = (beanId) => {
    this.props.history.push(`/roasts/${beanId}`);
  }

  setBeanId = () => {
    const firebaseId = this.props.match.params.id;
    if (firebaseId) {
      this.setState({ modal: true });
    }
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
        if (item.origin.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase())) {
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
    $('body').addClass('inventories');
  }

  componentWillUnmount() {
    $('body').removeClass('inventories');
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
      view,
      isSearching,
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
      <div className='form-container col w-95'>
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

    const makeSearch = () => {
      if (isSearching) {
        return (
          <SearchField
            placeholder="Search Beans By Region or Name..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-50 animated slideInLeft"
            onEnter={this.onEnter}
            onSearchClick={this.onSearchClick}
          />
        );
      }
      return (<div></div>);
    };

    return (
      <div className="inventory mt-5">
        <div className="btn-div col w-100">
          <button type="button" className="btn inventory-add-btn mr-1" onClick={this.toggleModal}>
            <i className="fas fa-plus-circle" />
          </button>
          <button type="button" className="btn inventory-search-btn" onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
        </div>
        <h1 className="text-center">Your Inventory</h1>
        <div className="search-div">{makeSearch()}</div>
          <div>
            <MyModal
            makeForm = {makeForm()}
            isEditing={isEditing}
            modal={modal}
            toggleModal={this.toggleModal}
            view={view}
            />
          </div>
        <div className="inv-cards row justify-content-center animated slideInRight">
          {inventoryCards}
        </div>
      </div>
    );
  }
}

export default Inventory;
