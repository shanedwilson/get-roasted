import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllFacts = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/facts.json`)
    .then((results) => {
      const factsObject = results.data;
      const factsArray = [];
      if (factsObject !== null) {
        Object.keys(factsObject).forEach((factId) => {
          factsObject[factId].id = factId;
          factsArray.push(factsObject[factId]);
        });
      }
      console.log(factsArray);
      resolve(factsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllFacts };
