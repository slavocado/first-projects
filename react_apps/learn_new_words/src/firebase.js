import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyANm3tbGe3o8jMrHvjlTLE0d3xxLuVipX8",
    authDomain: "learn-w0rds.firebaseapp.com",
    databaseURL: "https://learn-w0rds.firebaseio.com",
    projectId: "learn-w0rds",
    storageBucket: "learn-w0rds.appspot.com",
    messagingSenderId: "751984025338",
    appId: "1:751984025338:web:8d0ec57806ce4220b03343",
    measurementId: "G-T7D0EPJC3K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const projectFirestore = firebase.firestore();

export {projectFirestore, auth}