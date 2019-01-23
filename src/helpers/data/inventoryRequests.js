import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBeanIdsForInventory = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/inventory.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const inventoryBeansObject = result.data;
      const beanIds = [];
      if (inventoryBeansObject !== null) {
        Object.keys(inventoryBeansObject).forEach((ibId) => {
          beanIds.push(inventoryBeansObject[ibId].beanId);
        });
      }
      resolve(beanIds);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllInventory = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/inventory.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const inventoryObject = results.data;
      const inventoryArray = [];
      if (inventoryObject !== null) {
        Object.keys(inventoryObject).forEach((inventoryId) => {
          inventoryObject[inventoryId].id = inventoryId;
          inventoryArray.push(inventoryObject[inventoryId]);
        });
      }
      resolve(inventoryArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleInventory = itemId => axios.get(`${firebaseUrl}/inventory/${itemId}.json`);

const deleteItem = itemId => axios.delete(`${firebaseUrl}/inventory/${itemId}.json`);

const createInventory = inventoryObject => axios.post(`${firebaseUrl}/inventory.json`, (inventoryObject));

const updateInventory = (inventoryId, inventoryObject) => axios.put(`${firebaseUrl}/inventory/${inventoryId}.json`, (inventoryObject));

export default {
  getAllInventory,
  getBeanIdsForInventory,
  getSingleInventory,
  deleteItem,
  createInventory,
  updateInventory,
};
