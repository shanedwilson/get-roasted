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
        beansArray.sort((a, b) => {
          if (a.origin < b.origin) { return -1; }
          if (a.origin > b.origin) { return 1; }
          return 0;
        });
      }
      resolve(beansArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getBeansByArrayOfIds = beanIdsArray => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/beans.json`)
    .then((result) => {
      const beansObject = result.data;
      const beansArray = [];
      if (beansObject !== null) {
        Object.keys(beansObject).forEach((bean) => {
          beansObject[bean].id = bean;
          beansArray.push(beansObject[bean]);
        });
      }
      const selectedBeans = beansArray.filter(x => beanIdsArray.includes(x.id));
      resolve(selectedBeans);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleBean = beanId => axios.get(`${firebaseUrl}/beans/${beanId}.json`);

const deleteBean = beanId => axios.delete(`${firebaseUrl}/beans/${beanId}.json`);

const createBean = beanObject => axios.post(`${firebaseUrl}/beans.json`, (beanObject));

const updateBean = (beanId, beanObject) => axios.put(`${firebaseUrl}/beans/${beanId}.json`, beanObject);

export default {
  getAllBeans,
  getBeansByArrayOfIds,
  getSingleBean,
  deleteBean,
  createBean,
  updateBean,
};
