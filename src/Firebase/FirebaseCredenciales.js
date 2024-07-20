// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBUw4Ba-tWwbmfKiW0BBZ2Tfp4WODHHsWg",
	authDomain: "baby-store-ada.firebaseapp.com",
	projectId: "baby-store-ada",
	storageBucket: "baby-store-ada.appspot.com",
	messagingSenderId: "95802715221",
	appId: "1:95802715221:web:d67fa76e14bcdf1f9938dc",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
