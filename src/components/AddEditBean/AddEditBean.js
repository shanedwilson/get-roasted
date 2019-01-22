import React from 'react';
import PropTypes from 'prop-types';

import './AddEditBean.scss';

const defaultBean = {
  name: '',
  region: 0,
  imgUrl: false,
  description: '',
};

class AddEditBean extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editId: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
  }

  state = {
    newBean: defaultBean,
  }

  render() {
    const {
      isEditing
    } = this.props

    const makeHeadline = () => {
      if (isEditing === false) {
        return (
        <div className="mx-auto">
          <h3>Add Bean</h3>
        </div>
        )
      }
        return (
        <div className="mx-auto">
          <h3>Edit Bean</h3>
        </div>
        )
    }

    return (
      <div>
        <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
          {makeHeadline()}
          <div className="form col-11 mt-2">
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Region</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Region</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="Indonesia"
                />
              </div>
            </div>          
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">Name</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Name</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Sumatra Wet Process Gunung Tujuh"
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Description</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Description</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="Sumatra"
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

export default AddEditBean;
