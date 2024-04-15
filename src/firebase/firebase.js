// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging ,onMessage,getToken} from "firebase/messaging";
// import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnK2YjSICelpTt8q7MY2OpaFtvZbIKihQ",
  authDomain: "helping-hands-6f791.firebaseapp.com",
  projectId: "helping-hands-6f791",
  storageBucket: "helping-hands-6f791.appspot.com",
  messagingSenderId: "246792689752",
  appId: "1:246792689752:web:bbd1d497829c7483e3d22d",
  measurementId: "G-DZ230VNKLH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// export const auth = getAuth(app);
export const messaging = getMessaging(app);

export const onMessageLsitener=()=>{
   return new Promise((resolve)=>{
       onMessage(messaging,(payload)=>{
           console.log("OnMessage Payload",payload);
           resolve(payload);
       })
   })
}

export const requestForToken=async ()=>{
  try {
       const currentToken = await getToken(messaging, { vapidKey: "BDgbtJg9HSRtCZB0wv0f-OlNzJgjTABWA4xBSNTNUIOHDvydFTg4uCLNKGlaFPWd30yeFBxjCqmDLg80PhwNtsU" });
       if (currentToken) {
           console.log(currentToken);
       } else {
           console.log("No registeration token availabel ");
       }
   } catch (err) {
       console.log(err);
   }
}