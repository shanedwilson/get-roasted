import axios from 'axios';
import apiKeys from '../apiKeys';

const weatherbitKey = apiKeys.weatherbitKeys.apiKey;

const getCurrentWeather = (lat, lon) => new Promise((resolve, reject) => {
  axios.get(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&units=I&key=${weatherbitKey}`)
    .then((results) => {
      resolve(results.data.data[0]);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getCurrentWeather };
