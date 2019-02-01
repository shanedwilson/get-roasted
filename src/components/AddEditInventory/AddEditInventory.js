import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import inventoryRequests from '../../helpers/data/inventoryRequests';

import './AddEditInventory.scss';

const defaultInventory = {
  beanId: '',
  uid: '',
  pounds: '',
  ounces: '',
};

class AddEditInventory extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editId: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    setSelect: PropTypes.func,
    beanId: PropTypes.string,
  }

  state = {
    newInventory: defaultInventory,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInventory = { ...this.state.newInventory };
    tempInventory[name] = e.target.value;
    this.setState({ newInventory: tempInventory });
  }

  poundsChange = e => this.formFieldStringState('pounds', e);

  ouncesChange = e => this.formFieldStringState('ounces', e);

  beanSelect = (e) => {
    const { setSelect } = this.props;
    const selectedBean = e.target.value;
    setSelect(selectedBean);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, beanId } = this.props;
    const myInventory = { ...this.state.newInventory };
    const uid = authRequests.getCurrentUid();
    myInventory.beanId = beanId;
    myInventory.uid = uid;
    onSubmit(myInventory);
    this.setState({ newInventory: defaultInventory });
  }

  componentDidMount(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      inventoryRequests.getSingleInventory(editId)
        .then((item) => {
          this.setState({ newInventory: item.data });
        })
        .catch((err) => {
          console.error('error getting single inventory item', err);
        });
    }
  }

  render() {
    const {
      beans,
      isEditing,
      beanId,
    } = this.props;

    const {
      newInventory,
    } = this.state;

    const makeHeadline = () => {
      if (isEditing === false) {
        return (
        <div className="mx-auto mt-3">
          <h5>Add Inventory Item</h5>
        </div>
        );
      }
      return (
        <div className="mx-auto mt-3">
          <h5>Edit Inventory Item</h5>
        </div>
      );
    };

    const dropdownItems = beans.map(bean => (
    <option key={bean.id} value={bean.id}>{bean.name}</option>
    ));

    return (
      <div>
        <form className="row form-container border border-dark rounded mt-5 mx-auto col-6" onSubmit={this.formSubmit}>
          {makeHeadline()}
          <div className="form mt-2 col-11">
            <select className="custom-select mb-2" onChange={this.beanSelect} value={beanId} >
              <option defaultValue>Select Bean</option>
              {dropdownItems}
            </select>
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">lbs</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">lbs</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="1"
                  value={newInventory.pounds}
                  onChange={this.poundsChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">oz</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">oz</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="0"
                  value={newInventory.ounces}
                  onChange={this.ouncesChange}
                />
              </div>
            </div>
          </div>
           <button type="submit" className="btn add-btn btn-success my-5">
            <i className="fas fa-plus-circle" />
          </button>
        </form>
      </div>
    );
  }
}

export default AddEditInventory;
