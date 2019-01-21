import React from 'react';

import './AddEditInventory.scss';

class AddEditInventory extends React.Component {

  render() {
    const {
      beans,
    } = this.props;

  const dropdownItems = beans.map(bean => (
    <option value={bean.id}>{bean.name}</option>
  ));

    return (
      <div>
        <form className="row form-container border border-dark rounded mt-5 mx-auto col-8" onSubmit={this.formSubmit}>
          <div className="form mt-2 col-11">
            <select class="custom-select mb-2">
              <option selected>Select Bean</option>
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
