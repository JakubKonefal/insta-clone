import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCsWPVhcPheoKk-qPrN7gyhwUMU7AFSRRE',
  authDomain: 'insta-clone-785ec.firebaseapp.com',
  databaseURL: 'https://insta-clone-785ec.firebaseio.com',
  projectId: 'insta-clone-785ec',
  storageBucket: 'insta-clone-785ec.appspot.com',
  messagingSenderId: '1010088921512',
  appId: '1:1010088921512:web:4260783ca801f21cd4359d'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
