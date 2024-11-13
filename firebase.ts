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
    apiKey: "AIzaSyBBnDsBUjc1tqQx92J4ZFcp1GO1j_mWGuY",
    authDomain: "expo-template-334b4.firebaseapp.com",
    projectId: "expo-template-334b4",
    storageBucket: "expo-template-334b4.appspot.com",
    messagingSenderId: "596767691115",
    appId: "1:596767691115:web:5b37ba7c352100509cbc2e",
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
