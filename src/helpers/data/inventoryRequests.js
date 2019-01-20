import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllInventory = (uid) => new Promise((resolve, reject) => {
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

export default { getAllInventory };
