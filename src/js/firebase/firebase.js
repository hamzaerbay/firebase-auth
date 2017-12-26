// import firebase from 'firebase';
import * as firebase from 'firebase';


const config = {
  apiKey: 'API KEY',
  authDomain: 'API DOMAIN',
  databaseURL: 'DATABASE URL',
  projectId: 'PROJECT ID',
  storageBucket: 'STORAGE BUCKET',
  messagingSenderId: 'MESSAGING SENDER ID',
};

// if (!firebase.app.length) {
firebase.initializeApp(config);
// }

const auth = firebase.auth();
const db = firebase.database();

export {
  auth,
  db,
};
