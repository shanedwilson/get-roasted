import React from 'react';
import PropTypes from 'prop-types';
import beanRequests from '../../helpers/data/beanRequests';

import './AddEditBean.scss';

const defaultBean = {
  name: '',
  region: '',
  imgUrl: '',
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

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempBean = { ...this.state.newBean };
    tempBean[name] = e.target.value;
    this.setState({ newBean: tempBean });
  }

  nameChange = e => this.formFieldStringState('name', e);

  regionChange = e => this.formFieldStringState('region', e);

  imageChange = e => this.formFieldStringState('imgUrl', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myBean = { ...this.state.newBean };
    onSubmit(myBean);
    this.setState({ newBean: defaultBean });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      beanRequests.getSingleBean(editId)
        .then((bean) => {
          this.setState({ newBean: bean });
        })
        .catch((err) => {
          console.error('error getting single bean', err);
        });
    }
  }

  render() {
    const {
      isEditing
    } = this.props

    const {
      newBean
    } = this.state

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
                  id="region"
                  placeholder="Indonesia"
                  value={newBean.region}
                  onChange={this.regionChange}
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
                  value={newBean.name}
                  onChange={this.nameChange}
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
                  id="description"
                  placeholder="Delicious Coffee"
                  value={newBean.description}
                  onChange={this.descriptionChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Image Url</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Image Url</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="www.coolbeans.com"
                  value={newBean.imgUrl}
                  onChange={this.imageChange}
                />
              </div>
            </div>  
          </div>
           <button type="submit" className="btn add-btn btn-success my-5" onClick={this.formSubmit}>
            <i className="fas fa-plus-circle" />
          </button>
        </form>
      </div>
    );
  }
}

export default AddEditBean;
