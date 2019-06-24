import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllAttemptsByUid = (uid, firebaseId) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/attempts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const attemptsObject = results.data;
      const attemptsArray = [];
      if (attemptsObject !== null) {
        Object.keys(attemptsObject).forEach((attemptId) => {
          attemptsObject[attemptId].id = attemptId;
          if (attemptsObject[attemptId].roastId === `${firebaseId}`) {
            attemptsArray.push(attemptsObject[attemptId]);
          }
          attemptsArray.sort((a, b) => ((a.date - b.date)));
        });
      }
      resolve(attemptsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllAttemptsByRoastId = roastId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/attempts.json?orderBy="roastId"&equalTo="${roastId}"`)
    .then((results) => {
      const attemptsObject = results.data;
      const attemptsArray = [];
      if (attemptsObject !== null) {
        Object.keys(attemptsObject).forEach((attemptId) => {
          attemptsObject[attemptId].id = attemptId;
          attemptsArray.push(attemptsObject[attemptId]);
        });
        attemptsArray.sort((a, b) => ((a.date - b.date)));
      }
      resolve(attemptsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleAttempt = attemptId => axios.get(`${firebaseUrl}/attempts/${attemptId}.json`);

const deleteAttempt = attemptId => axios.delete(`${firebaseUrl}/attempts/${attemptId}.json`);

const createAttempt = attemptObject => axios.post(`${firebaseUrl}/attempts.json`, (attemptObject));

const updateAttempt = (attemptId, attemptObject) => axios.put(`${firebaseUrl}/attempts/${attemptId}.json`, (attemptObject));

export default {
  getAllAttemptsByUid,
  getAllAttemptsByRoastId,
  deleteAttempt,
  getSingleAttempt,
  createAttempt,
  updateAttempt,
};
