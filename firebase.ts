import { y } from "chart.js/dist/chunks/helpers.core";
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_B5Q-88APAPNUgzX0oTe5ZXF1hm8oBFs",
  authDomain: "tis4-demo.firebaseapp.com",
  databaseURL: "https://tis4-demo-default-rtdb.firebaseio.com",
  projectId: "tis4-demo",
  storageBucket: "tis4-demo.appspot.com",
  messagingSenderId: "87812483501",
  appId: "1:87812483501:web:9aeaf8b970f01785db9924"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };
