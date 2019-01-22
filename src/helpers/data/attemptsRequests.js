import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllAttempts = (uid, firebaseId) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/attempts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const attemptsObject = results.data;
      const attemptsArray = [];
      if (attemptsObject !== null) {
        Object.keys(attemptsObject).forEach((attemptId) => {
          attemptsObject[attemptId].id = attemptId;
            if ( attemptsObject[attemptId].roastId === `${firebaseId}` ) {
              attemptsArray.push(attemptsObject[attemptId]);
            }          
        });
      }
      resolve(attemptsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteAttempt = attemptId => axios.delete(`${firebaseUrl}/attempts/${attemptId}.json`);

export default { getAllAttempts, deleteAttempt };
