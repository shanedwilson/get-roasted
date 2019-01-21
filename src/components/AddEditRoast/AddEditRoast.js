import React from 'react';

import './AddEditRoast.scss';

class AddEditRoast extends React.Component {

  render() {
    const {
      beans,
    } = this.props;

  const dropdownItems = beans.map(bean => (
    <option key={bean.id} value={bean.id}>{bean.name}</option>
  ));

    return (
      <div>
        <form className="row form-container border border-dark rounded mt-5 mx-auto col-10" onSubmit={this.formSubmit}>
          <div className="form mt-3 col-11">
            <select className="custom-select mb-2">
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

export default AddEditRoast;
