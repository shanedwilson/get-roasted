import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import authRequests from '../../../helpers/data/authRequests';
import attemptsRequests from '../../../helpers/data/attemptsRequests';
import weatherRequests from '../../../helpers/data/weatherRequests';

import './AddAttempts.scss';

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
  endTime: '',
  endTemp: '',
  firstTime: '',
  firstTemp: '',
  secondTime: '',
  secondTemp: '',
  roastLevel: '',
};

class AddAttempts extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editId: PropTypes.string,
    roastId: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    attemptId: PropTypes.string,
  }

  state = {
    newAttempt: defaultAttempt,
    weather: [],
  }

  getWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    weatherRequests.getCurrentWeather(lat, lon)
      .then((weather) => {
        this.setState({ weather });
      })
      .catch((error) => {
        console.error('error with weather GET', error);
      });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempAttempt = { ...this.state.newAttempt };
    tempAttempt[name] = e.target.value;
    this.setState({ newAttempt: tempAttempt });
  }

  formFieldNumberState = (name, e) => {
    const tempAttempt = { ...this.state.newAttempt };
    tempAttempt[name] = e.target.value * 1;
    this.setState({ newAttempt: tempAttempt });
  }

  notesChange = e => this.formFieldStringState('notes', e);

  ratingChange = e => this.formFieldNumberState('rating', e);

  endTimeChange = e => this.formFieldStringState('endTime', e);

  endTempChange = e => this.formFieldNumberState('endTemp', e);

  firstTimeChange = e => this.formFieldStringState('firstTime', e);

  firstTempChange = e => this.formFieldNumberState('firstTemp', e);

  secondTimeChange = e => this.formFieldStringState('secondTime', e);

  secondTempChange = e => this.formFieldNumberState('secondTemp', e);

  roastLevelChange = e => this.formFieldStringState('roastLevel', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { weather } = this.state;
    const { attemptId, roastId, onSubmit } = this.props;
    const myAttempt = { ...this.state.newAttempt };
    const uid = authRequests.getCurrentUid();
    myAttempt.temp = weather.temp;
    myAttempt.humidity = weather.rh;
    myAttempt.city = weather.city_name;
    myAttempt.state = weather.state_code;
    myAttempt.date = moment().valueOf();
    myAttempt.beanId = attemptId;
    myAttempt.uid = uid;
    myAttempt.roastId = roastId;
    onSubmit(myAttempt);
  }

  componentDidMount(prevProps) {
    navigator.geolocation.getCurrentPosition(this.getWeather);
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      attemptsRequests.getSingleAttempt(editId)
        .then((attempt) => {
          this.setState({ newAttempt: attempt.data });
        })
        .catch((err) => {
          console.error('error getting single roast', err);
        });
    }
  }

  render() {
    const {
      newAttempt,
    } = this.state;

    return (
      <div className="AddAttempts mx-auto mb-5 w-100">
        <form className="row form-container border border-dark rounded mt-5 mx-auto my-auto col-12" onSubmit={this.formSubmit}>
          <div className="form mt-2 col-11">
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
                  placeholder="300"
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
                  id="secondTime"
                  placeholder="12:00"
                  value={newAttempt.SecondTime}
                  onChange={this.secondTimeChange}
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
                  id="secondTemp"
                  placeholder="275"
                  value={newAttempt.SecondTemp}
                  onChange={this.secondTempChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">End Time</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">End Time</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  placeholder="15:30"
                  value={newAttempt.endTime}
                  onChange={this.endTimeChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="name" className="sr-only">End Temp</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">End Temp</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="length"
                  placeholder="260"
                  value={newAttempt.endTemp}
                  onChange={this.endTempChange}
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
                  onChange={this.notesChange}
                />
              </div>
            </div>
            <div className="col-auto form-lines p-0">
              <label htmlFor="link" className="sr-only">Roast Level</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Roast Level</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="roast-level"
                  placeholder="Full City"
                  value={newAttempt.roastLevel}
                  onChange={this.roastLevelChange}
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
                  onChange={this.ratingChange}
                />
              </div>
            </div>
          </div>
           <button type="submit" className="btn add-btn btn-success my-auto mx-auto">
            <i className="fas fa-plus-circle" />
          </button>
        </form>
      </div>
    );
  }
}

export default AddAttempts;
