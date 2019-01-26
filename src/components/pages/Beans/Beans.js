import React from 'react';
import SearchField from 'react-search-field';
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

  passBeanToEdit = beanId => this.setState({ isEditing: true, editId: beanId });

  formSubmitEvent = (newBean) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      beanRequests.updateBean(editId, newBean)
        .then(() => {
          this.getBeans();
          this.setState({ isEditing: false });
        });
    } else {
      beanRequests.createBean(newBean)
        .then(() => {
          this.getBeans();
        });
    }
  }

  render() {
    const { filteredBeans, isEditing, editId } = this.state;
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

    const makeForm = () => {
      if (uid === ownerUid) {
        return (
          <div className="row">
            <div className="col mt-5">
              <p className="text-center">Here you'll find a selection of beans from around the world.
              Click the '+' button on any bean you'd like to add to your inventory.</p>
            </div>
            <div className='form-container col'>
              <AddEditBean
                isEditing={isEditing}
                onSubmit={this.formSubmitEvent}
                editId={editId}
              />
            </div>
          </div>
        );
      }
      return (
          <div className="row">
            <div className="col mt-5">
              <p className="text-center">Here you'll find a selection of beans from around the world.
              Click the '+' button on any bean you'd like to add to your inventory.</p>
            </div>
          </div>
      );
    };

    return (

        <div className="beans">
          <h1 className="text-center">BEANS!!!</h1>
          <SearchField
            placeholder="Search Beans..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-100"
          />
          {makeForm()}
          <div className="row justify-content-center">
            {beanCards}
          </div>
        </div>
    );
  }
}

export default Beans;
