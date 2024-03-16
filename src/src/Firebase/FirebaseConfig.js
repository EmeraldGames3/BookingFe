// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl2sYT_T-36BStkuzJQaR72S_5ZLjUlRA",
  authDomain: "betest-f4184.firebaseapp.com",
  projectId: "betest-f4184",
  storageBucket: "betest-f4184.appspot.com",
  messagingSenderId: "83349131926",
  appId: "1:83349131926:web:6cd42dfaf64e2ac34b68b7",
  measurementId: "G-2JNT5VLGDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Export the Firebase app (and any other services you initialize)
export { app, analytics };
