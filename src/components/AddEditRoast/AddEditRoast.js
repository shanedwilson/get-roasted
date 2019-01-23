import React from 'react';
import PropTypes from 'prop-types';
import roastRequests from '../../helpers/data/roastRequests';
import authRequests from '../../helpers/data/authRequests';

import './AddEditRoast.scss';

const defaultRoast = {
  beanId: '',
  uid: '',
  roastName: '',
};

class AddEditRoast extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editId: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    setSelect: PropTypes.func,
    beanId: PropTypes.string,
  }

  state = {
    newRoast: defaultRoast,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempRoast = { ...this.state.newRoast };
    tempRoast[name] = e.target.value;
    this.setState({ newRoast: tempRoast });
  }

  roastNameChange = e => this.formFieldStringState('roastName', e);

  beanSelect = (e) => {
    const { setSelect } = this.props;
    const selectedBean = e.target.value;
    setSelect(selectedBean);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, beanId } = this.props;
    const myRoast = { ...this.state.newRoast };
    const uid = authRequests.getCurrentUid();
    myRoast.beanId = beanId;
    myRoast.uid = uid;
    onSubmit(myRoast);
    this.setState({ newRoast: defaultRoast });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      roastRequests.getSingleRoast(editId)
        .then((roast) => {
          this.setState({ newRoast: roast });
        })
        .catch((err) => {
          console.error('error getting single roast', err);
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
      newRoast,
    } = this.state;

    const makeHeadline = () => {
      if (isEditing === false) {
        return (
        <div className="mx-auto">
          <h3>Add Roast</h3>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <h3>Edit Roast</h3>
        </div>
      );
    };

    const dropdownItems = beans.map(bean => (
    <option key={bean.id} value={bean.id}>{bean.name}</option>
    ));

    return (
      <div>
        <form className="row form-container border border-dark rounded mt-5 mx-auto col-10" onSubmit={this.formSubmit}>
          {makeHeadline()}
          <div className="form mt-3 col-11">
            <select className="custom-select mb-2" onChange={this.beanSelect} value={beanId}>
              <option defaultValue>Select Bean</option>
              {dropdownItems}
            </select>
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">Roast Name</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Roast Name</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="St. Izzy's Sumatran Dark"
                  value={newRoast.roastName}
                  onChange={this.roastNameChange}
                />
              </div>
            </div>
          </div>
           <button type="submit" className="btn add-btn btn-success my-5">
            <i className="fas fa-plus-circle" onClick={this.formSubmit} />
          </button>
        </form>
      </div>
    );
  }
}

export default AddEditRoast;
