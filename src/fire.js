import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// import 'firebase/compat/database'
// import 'firebase/compat/remote-config'
// import 'firebase/compat/functions'
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC-RJrAqnUJbhfCJOz6Y7k7voxaHN-cuy0",
  authDomain: "omica-cloud.firebaseapp.com",
  databaseURL: "https://omica-cloud-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "omica-cloud",
  storageBucket: "omica-cloud.appspot.com",
  messagingSenderId: "404980456265",
  appId: "1:404980456265:web:2eedd9c75b7b3d1a429898",
  measurementId: "G-PB8QY787BE"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// const functions = firebase.functions();
const functions = getFunctions();

export {auth, db, functions, httpsCallable}