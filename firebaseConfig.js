// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database'; // If using Realtime Database
// import { getFirestore } from 'firebase/firestore'; // If using Firestore
// import { getStorage } from 'firebase/storage'; // If using Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJyWPV3468R4btrYlG6X08Z8xJJEYvm3Y',
  authDomain: 'ecogo-82491.firebaseapp.com',
  databaseURL: 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'ecogo-82491',
  storageBucket: 'ecogo-82491.firebasestorage.app',
  messagingSenderId: '17233768216',
  appId: '1:17233768216:android:562e2bcd4bd2b80979b86d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getDatabase(app); // Realtime DB
// export const firestore = getFirestore(app); // Firestore
// export const storage = getStorage(app); // Storage

export {  app, auth };
