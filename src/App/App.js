import React, { Component } from 'react';
import { Button } from 'reactstrap';
import weatherRequests from '../helpers/data/weatherRequests';
import './App.scss';

class App extends Component {

  getWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    weatherRequests.getCurrentWeather(lat, lon)
      .then((weather) => {
        console.log('weather data: ', weather)
      })
      .catch((err) => {
        console.error('error with weather GET', err);
      });  
  }  

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getWeather)    
  }



  render() {
    return (
      <div className="App text-center">
        <h1>Get Roasted!</h1>
        <button className='btn btn-success'>Bootstrap Button</button>
        <Button className='btn btn-primary'>Reactstrap Button</Button>
      </div>
    );
  }
}

export default App;
