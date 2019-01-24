import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import attemptsRequests from '../../../helpers/data/attemptsRequests';


import './AddEditAttempts.scss';

const defaultAttempt = {
  uid: '',
  roastId: '',
  notes: '',
  rating: '',
  temp: '',
  humidity: '',
  city: '',
  state: '',
  date: '',
  length: '',
  firstTime: '',
  firstTemp: '',
  secondTime: '',
  secondTemp: '',
  roastLevel: '',
};

class AddEditAttempts extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editId: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    beanId: PropTypes.string,
  }

  state = {
    newAttempt: defaultAttempt,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempAttempt = { ...this.state.newAttempt };
    tempAttempt[name] = e.target.value;
    this.setState({ newAttempt: tempAttempt });
  }

  notesChange = e => this.formFieldStringState('notes', e);

  ratingChange = e => this.formFieldStringState('rating', e);

  lengthChange = e => this.formFieldStringState('length', e);

  firstTimeChange = e => this.formFieldStringState('firstTime', e);

  firstTempChange = e => this.formFieldStringState('firstTemp', e);

  secondTimeChange = e => this.formFieldStringState('secondTime', e);

  secondTempChange = e => this.formFieldStringState('secondTemp', e);

  roastLevelChange = e => this.formFieldStringState('roastLevel', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, attemptId } = this.props;
    const myAttempt = { ...this.state.newAttempt };
    const uid = authRequests.getCurrentUid();
    myAttempt.beanId = attemptId;
    myAttempt.uid = uid;
    onSubmit(myAttempt);
    this.setState({ newAttempt: defaultAttempt });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      attemptsRequests.getSingleAttempt(editId)
        .then((attempt) => {
          this.setState({ newAttempt: attempt.data });
        })
        .catch((err) => {
          console.error('error getting single attempt', err);
        });
    }
  }

  render() {
    const {
      isEditing,
    } = this.props;

    const {
      newAttempt,
    } = this.state;

    const makeHeadline = () => {
      if (isEditing === false) {
        return (
        <div className="mx-auto">
          <h3>Add Roast Attempt</h3>
        </div>
        );
      }
      return (
        <div className="mx-auto">
          <h3>Edit Roast Attempt</h3>
        </div>
      );
    };
    return (
      <div className="AddEditAttempts mx-auto">
        <h1>ADD/EDIT ATTEMPTS!!!</h1>
        <form className="row form-container border border-dark rounded mt-5 mx-auto col-6" onSubmit={this.formSubmit}>
          {makeHeadline()}
          <div className="form mt-2 col-11">
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">Length</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Length</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  placeholder="15:30"
                  value={newAttempt.length}
                  onChange={this.lengthChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">First Crack Time</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">First Crack Time</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="firstTime"
                  placeholder="9:00"
                  value={newAttempt.firstTime}
                  onChange={this.firstTimeChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">First Crack Temp</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">First Crack Temp</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="firstTemp"
                  placeholder="9:00"
                  value={newAttempt.firstTemp}
                  onChange={this.firstTempChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Second Crack Time</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Second Crack Time</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="SecondTime"
                  placeholder="9:00"
                  value={newAttempt.SecondTime}
                  onChange={this.SecondTimeChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Second Crack Temp</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Second Crack Temp</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="SecondTemp"
                  placeholder="12:00"
                  value={newAttempt.SecondTemp}
                  onChange={this.SecondTempChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Notes</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Notes</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="notes"
                  placeholder="Preheat. Manual mode."
                  value={newAttempt.notes}
                  onChange={this.notes}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Rating</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Rating</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="rating"
                  placeholder="1-10"
                  value={newAttempt.rating}
                  onChange={this.rating}
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

export default AddEditAttempts;
