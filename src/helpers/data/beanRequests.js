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

const getBeansByArrayOfIds = (beanIdsArray) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/beans.json`)
    .then((result) => {
      const beansObject = result.data;
      const beansArray = [];
      if (beansObject !== null) {
        Object.keys(beansObject).forEach((beanId) => {
          beansObject[beanId].id = beanId;
          beansArray.push(beansObject[beanId]);
        });
      }
      const selectedBeans = beansArray.filter(x => beanIdsArray.includes(x.id));
      resolve(selectedBeans);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getAllBeans, getBeansByArrayOfIds };
