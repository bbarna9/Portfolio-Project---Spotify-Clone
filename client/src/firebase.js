import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA1D9ejAVoqwZCMN_1pxRmaJVDq6gh5BYw',
  authDomain: 'spotify-43243.firebaseapp.com',
  projectId: 'spotify-43243',
  storageBucket: 'spotify-43243.appspot.com',
  messagingSenderId: '523492931912',
  appId: '1:523492931912:web:11889082478325aadb5b7d',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
