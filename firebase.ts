
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Firebase configuration for DukaanMitra MVP
const firebaseConfig = {
  apiKey: "AIzaSyBGCPV3xZYjud46ATCfEPqA_I_X0bvgMrk",
  authDomain: "mvp1-aafa3.firebaseapp.com",
  projectId: "mvp1-aafa3",
  storageBucket: "mvp1-aafa3.firebasestorage.app",
  messagingSenderId: "675229096057",
  appId: "1:675229096057:web:91e072c57da06d36ad9ca8"
};

// Initialize Firebase using compat mode to ensure auth methods are available as methods on the instance
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
