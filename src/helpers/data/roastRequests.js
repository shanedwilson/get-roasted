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

const getSingleRoast = roastId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/roasts/${roastId}.json`)
    .then((result) => {
      const singleRoast = result.data;
      singleRoast.id = roastId;
      resolve(singleRoast);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteRoast = roastId => axios.delete(`${firebaseUrl}/roasts/${roastId}.json`);


export default {
  getAllRoasts,
  getSingleRoast,
  deleteRoast,
  };
