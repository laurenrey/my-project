import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwppdxGV26y4PUkayRkMo51r46iDDLTNM",
  authDomain: "mynewproject-rn.firebaseapp.com",
  projectId: "mynewproject-rn",
  storageBucket: "mynewproject-rn.appspot.com",
  messagingSenderId: "555930241814",
  appId: "1:555930241814:web:fb3bd4ed2452971a309e37",
  measurementId: "G-BSX48DNPLZ",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const user = auth.currentUser;
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export { auth };

// export const db = getFirestore(app);
// // firebase.initializeApp(firebaseConfig);

// // export default firebase;
