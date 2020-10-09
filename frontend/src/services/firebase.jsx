import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDUip7lQR1BpT0jLu7Gq3u-3Pq-kZ-XJtk",
  authDomain: "tccpolisystem.firebaseapp.com",
  databaseURL: "https://tccpolisystem.firebaseio.com",
  projectId: "tccpolisystem",
  storageBucket: "tccpolisystem.appspot.com",
  messagingSenderId: "1014051061257",
  appId: "1:1014051061257:web:4c3148d07f12e6037ac2d8",
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.firestore();
