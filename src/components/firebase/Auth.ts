import {auth, db} from "./FirebaseConfig.ts";
import toast from "react-hot-toast";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword,
    signOut,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

export const doCreateUserWithEmailAndPasswordAndUsername = async (email: string, password: string, username: string) => {
    try {
        let isSuccessful = false;
        await createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
            console.log(user);
            await setDoc(doc(db, "users", user.user.uid), {
                username: username,
                email: email
            });
            isSuccessful = true;
        });
        return isSuccessful;
    } catch (error: any) {
        alert("This user already exists!")
    }
}


export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        alert("This user already exists!")
    }
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        let isSuccessful = false;
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                isSuccessful = true;
            });
        return isSuccessful;
    } catch (error: any) {
       alert("Email or password is incorrect!")
    }
}

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((user) => {
            setDoc(doc(db, "users", user.user.uid), {
                username: user.user.displayName ? user.user.displayName.split(" (")[0]
                    : user.user.email ? user.user.email.split("@")[0] : "User",
                email: user.user.email
            });
        })
    } catch (error: any) {
        toast.error(error.message);
    }
}

export const doSignInWithGithub = async () => {
    try {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider).then((user) => {
            setDoc(doc(db, "users", user.user.uid), {
                username: user.user.displayName ? user.user.displayName.split(" (")[0]
                    : user.user.email ? user.user.email.split("@")[0] : "User",
                email: user.user.email
            });
        })
    } catch (error: any) {
        toast.error(error.message);
    }
}

export const doSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error: any) {
       toast.error(error.message);
    }
}

export const doPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        toast.error(error.message);
    }
}

export const doPasswordUpdate = async (password: string) => {
    try {
       if (auth.currentUser) {
           await updatePassword(auth.currentUser, password);
       }
    } catch (error: any) {
        toast.error(error.message);
    }
}

export const doSendEmailVerification = async () => {
    try {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
}