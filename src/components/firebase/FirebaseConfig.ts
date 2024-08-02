import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
/*import { getAnalytics } from "firebase/analytics";*/
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArX_FvV5ekXYo9Q9pWyuaMZji6L5Br0Ek",
    authDomain: "chessgpt-18d6b.firebaseapp.com",
    projectId: "chessgpt-18d6b",
    storageBucket: "chessgpt-18d6b.appspot.com",
    messagingSenderId: "843510916808",
    appId: "1:843510916808:web:988c60b77eb03e865ce7fd",
    measurementId: "G-QXB8VF8DB2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const usersCollection = collection(db, "users");

export { auth, db, usersCollection };