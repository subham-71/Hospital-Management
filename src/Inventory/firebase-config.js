import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_PATIENT_API_KEY,
  authDomain: process.env.REACT_APP_PATIENT_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PATIENT_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PATIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PATIENT_SENDER_ID,
  appId: process.env.REACT_APP_PATIENT_ID,
  measurementId: process.env.REACT_APP_PATIENT_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);