import {doc} from "firebase/firestore"
import {db} from "../components/firebase/FirebaseConfig.ts";
import {getDoc} from "firebase/firestore";

export const getUserById = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const documentSnapshot = await getDoc(docRef);

    return documentSnapshot.data();
}