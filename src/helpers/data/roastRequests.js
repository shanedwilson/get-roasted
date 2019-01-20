import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRoasts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/roasts.json?orderBy="uid"&equalTo="${uid}"`)
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

export default { getAllRoasts };
