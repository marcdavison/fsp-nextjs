// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const clientCredentials = {
    apiKey: 'AIzaSyCnYRaMn4kN7VLZMy_A6I_T5UAN0JqMTFE',
    authDomain: 'predictthescore.co.uk',
    databaseURL: 'https://footy-score-predictor-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'footy-score-predictor',
    messagingSenderId: '709989158387',
    measurementId: 'G-L7R6XC5XDW',
    appId: '1:709989158387:web:5d4eaf448f342238689686',
    storageBucket: 'footy-score-predictor.appspot.com',
};

// Prevent reinitialization during hot reloads
const firebaseApp = getApps().length ? getApp() : initializeApp(clientCredentials);

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const providerGoogle = new GoogleAuthProvider();

export { firebaseApp, auth, db, providerGoogle };