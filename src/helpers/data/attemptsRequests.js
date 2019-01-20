import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllAttempts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/attempts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const attemptsObject = results.data;
      const attemptsArray = [];
      if (attemptsObject !== null) {
        Object.keys(attemptsObject).forEach((attemptId) => {
          attemptsObject[attemptId].id = attemptId;
          attemptsArray.push(attemptsObject[attemptId]);
        });
      }
      resolve(attemptsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllAttempts };
