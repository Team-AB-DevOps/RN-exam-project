// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCyw2gWQI0oDyraDfe4n_eRkMBMdffkgrc",
    authDomain: "rn-todo-app-6832a.firebaseapp.com",
    projectId: "rn-todo-app-6832a",
    storageBucket: "rn-todo-app-6832a.appspot.com",
    messagingSenderId: "77468949049",
    appId: "1:77468949049:web:c4e637c2c7b4ffe13a0be8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);

let auth: Auth;
if (Platform.OS === "web") {
    auth = getAuth(app);
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
}

export { app, database, storage, auth };
