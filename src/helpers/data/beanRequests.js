import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllBeans = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/beans.json`)
    .then((results) => {
      const beansObject = results.data;
      const beansArray = [];
      if (beansObject !== null) {
        Object.keys(beansObject).forEach((beanId) => {
          beansObject[beanId].id = beanId;
          beansArray.push(beansObject[beanId]);
        });
      }
      resolve(beansArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllBeans };
