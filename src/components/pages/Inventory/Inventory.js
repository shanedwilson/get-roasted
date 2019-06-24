import React from 'react';
import $ from 'jquery';
import SearchField from 'react-search-field';
import { Tooltip } from 'reactstrap';
import Facts from '../../Facts/Facts';
import MyModal from '../../MyModal/MyModal';
import AlertModal from '../../AlertModal/AlertModal';
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
    factModal: false,
    alertModal: false,
    addTipOpen: false,
    searchTipOpen: false,
    factTipOpen: false,
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
    const { isSearching, inventory } = this.state;
    this.setState({ isSearching: !isSearching, filteredInventory: inventory });
  }

  toggleFactModal = () => {
    const { factModal } = this.state;
    this.setState({
      factModal: !factModal,
    });
  }

  toggleAlertModal = () => {
    const { alertModal } = this.state;
    this.setState({
      alertModal: !alertModal,
      modal: false,
    });
  }

  toggleAddTip = () => {
    const { addTipOpen } = this.state;
    this.setState({
      addTipOpen: !addTipOpen,
    });
  }

  toggleSearchTip = () => {
    const { searchTipOpen } = this.state;
    this.setState({
      searchTipOpen: !searchTipOpen,
    });
  }

  toggleFactTip = () => {
    const { factTipOpen } = this.state;
    this.setState({
      factTipOpen: !factTipOpen,
    });
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
    const { isEditing, editId, inventory } = this.state;
    if (isEditing) {
      inventoryRequests.updateInventory(editId, newInventory)
        .then(() => {
          this.getInventory();
          this.setState({ isEditing: false, beanId: '', modal: false });
        });
    } else if (this.state.inventory.length === 0) {
      inventoryRequests.createInventory(newInventory)
        .then(() => {
          this.getInventory();
          this.setState({ beanId: '', modal: false });
        });
    } else {
      inventory.forEach((item) => {
        if (item.beanId === newInventory.beanId) {
          this.setState({ alertModal: true });
        } else {
          inventoryRequests.createInventory(newInventory)
            .then(() => {
              this.getInventory();
              this.setState({ beanId: '', modal: false });
            });
        }
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
      factModal,
      alertModal,
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
            placeholder="Search Beans By Origin or Name..."
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
        <AlertModal
          alertModal={alertModal}
          toggleAlertModal={this.toggleAlertModal}
        />
        <Facts
        factModal={factModal}
        toggleFactModal={this.toggleFactModal}
        />
        <div className="btn-div col w-100">
          <button
            id="add-inventory-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-success mr-1"
            onClick={this.toggleModal}>
            <i className="fas fa-plus-circle" />
          </button>
          <Tooltip placement="right" isOpen={this.state.addTipOpen} target="add-inventory-btn" toggle={this.toggleAddTip}>
            Add Inventory
          </Tooltip>
          <button
            id="search-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-primary ml-2"
            onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
          <Tooltip placement="right" isOpen={this.state.searchTipOpen} target="search-btn" toggle={this.toggleSearchTip}>
            Search Inventory
          </Tooltip>
          <button
            id="fact-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-danger ml-2"
            onClick={this.toggleFactModal}>
            ?
          </button>
          <Tooltip placement="right" isOpen={this.state.factTipOpen} target="fact-btn" toggle={this.toggleFactTip}>
            Random Fact
          </Tooltip>
        </div>
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
