import * as firebase from 'firebase';

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARl1GFqLqRLc-efJdPcN0j9IbrmbmQob4",
    authDomain: "tennislove-bea15.firebaseapp.com",
    projectId: "tennislove-bea15",
    storageBucket: "tennislove-bea15.appspot.com",
    messagingSenderId: "469444913086",
    appId: "1:469444913086:web:c763aa7c14fac758b8bbef",
    measurementId: "G-CX7BMEF6PR"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

