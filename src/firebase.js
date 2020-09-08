import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDZ9hRxvfCwpmT23Z3Z_Xcs0s9uyAKrc04",
  authDomain: "todoapp-53ede.firebaseapp.com",
  databaseURL: "https://todoapp-53ede.firebaseio.com",
  projectId: "todoapp-53ede",
  storageBucket: "todoapp-53ede.appspot.com",
  messagingSenderId: "654671542755",
  appId: "1:654671542755:web:1abf2b13f6886a33c6c8d6",
  measurementId: "G-QS1N5282YX",
});

const db = firebaseApp.firestore();

export default db;
