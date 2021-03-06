import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRoasts = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/roasts.json`)
    .then((results) => {
      const roastsObject = results.data;
      const roastsArray = [];
      if (roastsObject !== null) {
        Object.keys(roastsObject).forEach((roastId) => {
          roastsObject[roastId].id = roastId;
          roastsArray.push(roastsObject[roastId]);
        });
      }
      resolve(roastsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleRoast = roastId => axios.get(`${firebaseUrl}/roasts/${roastId}.json`);

const deleteRoast = roastId => axios.delete(`${firebaseUrl}/roasts/${roastId}.json`);

const createRoast = roastObject => axios.post(`${firebaseUrl}/roasts.json`, (roastObject));

const updateRoast = (roastId, roastObject) => axios.put(`${firebaseUrl}/roasts/${roastId}.json`, (roastObject));


export default {
  getAllRoasts,
  getSingleRoast,
  deleteRoast,
  createRoast,
  updateRoast,
};
