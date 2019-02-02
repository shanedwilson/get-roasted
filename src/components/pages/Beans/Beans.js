import React from 'react';
import SearchField from 'react-search-field';
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
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
      isEditing: false,
    });
  }

  toggleSearch = () => {
    const { isSearching } = this.state;
    this.setState({ isSearching: !isSearching });
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
        if (bean.region.toLowerCase().includes(value.toLowerCase()) || bean.name.toLowerCase().includes(value.toLowerCase())) {
          filteredBeans.push(bean);
        }
        this.setState({ filteredBeans });
      });
    }
  }

  componentDidMount() {
    this.getBeans();
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
            placeholder="Search Beans By Region or Name..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-50"
          />
        );
      }
      return (<div></div>);
    };

    return (

        <div className="beans mt-5 w-100">
          <div className="btn-div col w-100">
            <button type="button" className="btn add-btn btn-success mr-1" onClick={this.toggleModal}>
              <i className="fas fa-plus-circle" />
            </button>
            <button type="button" className="btn add-btn btn-success" onClick={this.toggleSearch}>
              <i className="fas fa-search" />
            </button>
          </div>
          <div>
            <h1 className="text-center">BEANS!!!</h1>
          </div>
          <div className="search-div">{makeSearch()}</div>
          <div className="col mt-5">
            <p className="text-center">Here you'll find a selection of beans from around the world.
              Click the '+' button on any bean you'd like to add to your inventory.
            </p>
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
          <div className="row justify-content-center">
            {beanCards}
          </div>
        </div>
    );
  }
}

export default Beans;
