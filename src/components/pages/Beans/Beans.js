import React from 'react';
import $ from 'jquery';
import SearchField from 'react-search-field';
import { Tooltip } from 'reactstrap';
import Facts from '../../Facts/Facts';
import MyModal from '../../MyModal/MyModal';
import BeanCard from '../../BeanCard/BeanCard';
import AddEditBean from '../../AddEditBean/AddEditBean';
import authRequests from '../../../helpers/data/authRequests';
import beanRequests from '../../../helpers/data/beanRequests';


import './Beans.scss';

class Beans extends React.Component {
  state = {
    beans: [],
    filteredBeans: [],
    uid: '',
    isEditing: false,
    modal: false,
    editId: '',
    view: 'Bean',
    isSearching: false,
    factModal: false,
    addTipOpen: false,
    searchTipOpen: false,
    factTipOpen: false,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
      isEditing: false,
    });
  }

  toggleSearch = () => {
    const { isSearching, beans } = this.state;
    this.setState({ isSearching: !isSearching, filteredBeans: beans });
  }

  toggleFactModal = () => {
    const { factModal } = this.state;
    this.setState({
      factModal: !factModal,
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
    const { beans } = this.state;
    this.setState({ isSearching: false, filteredBeans: beans });
  }

  onSearchClick = () => {
    const { beans } = this.state;
    this.setState({ isSearching: false, filteredBeans: beans });
  }

  getBeans = () => {
    beanRequests.getAllBeans()
      .then((beans) => {
        this.setState({ beans });
        this.setState({ filteredBeans: beans });
      });
  };

  onChange = (value, event) => {
    const { beans } = this.state;
    const filteredBeans = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredBeans: beans });
    } else {
      beans.forEach((bean) => {
        if (bean.origin.toLowerCase().includes(value.toLowerCase()) || bean.name.toLowerCase().includes(value.toLowerCase())) {
          filteredBeans.push(bean);
        }
        this.setState({ filteredBeans });
      });
    }
  }

  componentDidMount() {
    this.getBeans();
    $('body').addClass('bean');
  }

  componentWillUnmount() {
    $('body').removeClass('bean');
  }

  inventoryView = (beanId) => {
    this.props.history.push(`/inventory/${beanId}`);
  }

  deleteSingleBean = (beanId) => {
    beanRequests.deleteBean(beanId)
      .then(() => {
        this.getBeans();
      });
  }

  passBeanToEdit = (beanId) => {
    const { modal } = this.state;
    this.setState({ isEditing: true, editId: beanId, modal: !modal });
  }

  formSubmitEvent = (newBean) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      beanRequests.updateBean(editId, newBean)
        .then(() => {
          this.getBeans();
          this.setState({ isEditing: false, modal: false });
        });
    } else {
      beanRequests.createBean(newBean)
        .then(() => {
          this.getBeans();
          this.setState({ modal: false });
        });
    }
  }

  render() {
    const {
      filteredBeans,
      isEditing,
      editId,
      modal,
      view,
      isSearching,
      factModal,
    } = this.state;
    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const beanCards = filteredBeans.map(bean => (
      <BeanCard
        key={bean.id}
        bean={bean}
        uid={uid}
        ownerUid={ownerUid}
        deleteSingleBean={this.deleteSingleBean}
        passBeanToEdit={this.passBeanToEdit}
        onSelect={this.inventoryView}
      />
    ));

    const makeForm = () => (
      <div className='form-container col w-95'>
        <AddEditBean
          isEditing={isEditing}
          onSubmit={this.formSubmitEvent}
          editId={editId}
          toggleModal={this.toggleModal}
        />
      </div>
    );

    const makeSearch = () => {
      if (isSearching) {
        return (
          <SearchField
            placeholder="Search By Origin or Name..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-50 animated slideInRight"
            onEnter={this.onEnter}
            onSearchClick={this.onSearchClick}
          />
        );
      }
      return (<div></div>);
    };

    return (

        <div className="beans mt-5 w-100">
          <Facts
          factModal={factModal}
          toggleFactModal={this.toggleFactModal}
          />
          <div className="btn-div col w-100">
              <button
                id="add-bean-btn"
                type="button"
                className="bttn-material-circle bttn-sm bttn-success mr-1"
                onClick={this.toggleModal}>
                <i className="fas fa-plus-circle" />
              </button>
              <Tooltip placement="right" isOpen={this.state.addTipOpen} target="add-bean-btn" toggle={this.toggleAddTip}>
                Add Beans
              </Tooltip>
            <button
              id="search-btn"
              type="button"
              className="bttn-material-circle bttn-sm bttn-primary ml-2"
              onClick={this.toggleSearch}>
              <i className="fas fa-search" />
            </button>
            <Tooltip placement="right" isOpen={this.state.searchTipOpen} target="search-btn" toggle={this.toggleSearchTip}>
              Search Beans
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
          <div className="search-div">
            {makeSearch()}
          </div>
          <div>
            <MyModal
            makeForm = {makeForm()}
            isEditing={isEditing}
            modal={modal}
            toggleModal={this.toggleModal}
            view={view}
            />
          </div>
          <div className="bean-container row justify-content-center animated slideInLeft">
            {beanCards}
          </div>
        </div>
    );
  }
}

export default Beans;
