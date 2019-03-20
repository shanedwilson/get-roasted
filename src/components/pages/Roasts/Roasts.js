import React from 'react';
import $ from 'jquery';
import SearchField from 'react-search-field';
import { Tooltip } from 'reactstrap';
import Facts from '../../Facts/Facts';
import MyModal from '../../MyModal/MyModal';
import RoastCard from '../../RoastCard/RoastCard';
import AddEditRoast from '../../AddEditRoast/AddEditRoast';
import smashDataRequests from '../../../helpers/data/smashDataRequests';
import authRequests from '../../../helpers/data/authRequests';
import beanRequests from '../../../helpers/data/beanRequests';
import roastRequests from '../../../helpers/data/roastRequests';

import './Roasts.scss';

class Roasts extends React.Component {
  state = {
    roasts: [],
    beans: [],
    filteredRoasts: [],
    isEditing: false,
    editId: '',
    beanId: '',
    modal: false,
    view: 'Roast',
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
      beanId: '',
    });
  }

  toggleSearch = () => {
    const { isSearching, roasts } = this.state;
    this.setState({ isSearching: !isSearching, filteredRoasts: roasts });
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
    const { roasts } = this.state;
    this.setState({ isSearching: false, filteredRoasts: roasts });
  }

  onSearchClick = () => {
    const { roasts } = this.state;
    this.setState({ isSearching: false, filteredAttempts: roasts });
  }

  setBeanId = () => {
    const firebaseId = this.props.match.params.id;
    if (firebaseId) {
      this.setState({ modal: true });
    }
    this.setState({ beanId: firebaseId });
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getRoastsWithBeanInfo(uid)
      .then((roasts) => {
        this.setState({ roasts });
        this.setState({ filteredRoasts: roasts });
      });
  };

  getAllBeans = () => {
    beanRequests.getAllBeans()
      .then((beans) => {
        this.setState({ beans });
      });
  }

  changeView = (roastId) => {
    this.props.history.push(`/attempts/${roastId}`);
  }

  onChange = (value, event) => {
    const { roasts } = this.state;
    const filteredRoasts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredRoasts: roasts });
    } else {
      roasts.forEach((roast) => {
        if (roast.name.toLowerCase().includes(value.toLowerCase())
        || roast.roastName.toLowerCase().includes(value.toLowerCase())
        || roast.origin.toLowerCase().includes(value.toLowerCase())) {
          filteredRoasts.push(roast);
        }
        this.setState({ filteredRoasts });
      });
    }
  }

  componentDidMount() {
    this.getRoasts();
    this.getAllBeans();
    this.setBeanId();
    $('body').addClass('roast');
  }

  componentWillUnmount() {
    $('body').removeClass('roast');
  }

  deleteSingleRoast = (roastId) => {
    roastRequests.deleteRoast(roastId)
      .then(() => {
        this.getRoasts();
      });
  }

  passRoastToEdit = (roastId, beanId) => {
    const { modal } = this.state;
    this.setState({
      isEditing: true,
      editId: roastId,
      beanId,
      modal: !modal,
    });
  }

  setSelect = (selectedBean) => {
    this.setState({ beanId: selectedBean });
  }

  formSubmitEvent = (newRoast) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      roastRequests.updateRoast(editId, newRoast)
        .then(() => {
          this.getRoasts();
          this.setState({ isEditing: false, beanId: '', modal: false });
        });
    } else {
      roastRequests.createRoast(newRoast)
        .then(() => {
          this.getRoasts();
          this.setState({ beanId: '', modal: false });
        });
    }
  }

  render() {
    const {
      filteredRoasts,
      beans,
      isEditing,
      editId,
      beanId,
      roasts,
      modal,
      view,
      isSearching,
      factModal,
    } = this.state;

    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const roastCards = filteredRoasts.map(roast => (
      <RoastCard
        key={roast.id}
        roast={roast}
        uid={uid}
        ownerUid={ownerUid}
        beanId={beanId}
        onSelect={this.changeView}
        deleteSingleRoast={this.deleteSingleRoast}
        passRoastToEdit={this.passRoastToEdit}
        roasts={roasts}
      />
    ));

    const makeForm = () => (
      <div className='form-container col w-95'>
        <AddEditRoast
          beans={beans}
          isEditing={isEditing}
          onSubmit={this.formSubmitEvent}
          editId={editId}
          beanId={beanId}
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
            classNames="test-class search w-50 animated slideInRight"
            onEnter={this.onEnter}
            onSearchClick={this.onSearchClick}
          />
        );
      }
      return (<div></div>);
    };

    return (
      <div className="Roasts mx-auto mt-5 w-100">
        <Facts
        factModal={factModal}
        toggleFactModal={this.toggleFactModal}
        />
        <div className="btn-div col w-100">
          <button
            id="add-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-success mr-1"
            onClick={this.toggleModal}>
            <i className="fas fa-plus-circle" />
          </button>
            <Tooltip placement="right" isOpen={this.state.addTipOpen} target="add-btn" toggle={this.toggleAddTip}>
              Add Roasts
            </Tooltip>
          <button
            id="search-btn"
            type="button"
            className="bttn-material-circle bttn-sm bttn-primary ml-2"
            onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
            <Tooltip placement="right" isOpen={this.state.searchTipOpen} target="search-btn" toggle={this.toggleSearchTip}>
              Search Roasts
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
        <div className="rst-cards row justify-content-center animated slideInLeft">
          {roastCards}
        </div>
      </div>
    );
  }
}

export default Roasts;
