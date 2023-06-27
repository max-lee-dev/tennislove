import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyARl1GFqLqRLc-efJdPcN0j9IbrmbmQob4",
    authDomain: "tennislove-bea15.firebaseapp.com",
    projectId: "tennislove-bea15",
    storageBucket: "tennislove-bea15.appspot.com",
    messagingSenderId: "469444913086",
    appId: "1:469444913086:web:c763aa7c14fac758b8bbef",
    measurementId: "G-CX7BMEF6PR"
};

// Initialize Firebase with v9

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);



