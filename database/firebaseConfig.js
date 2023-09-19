
//essas são as credenciais e configurações do firebase

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
   
  apiKey: "AIzaSyAzi1-G607OXoMWLtpIEr6qqhX-UK9zgKE",
  authDomain: "imagigram-10450.firebaseapp.com",
  projectId: "imagigram-10450",
  storageBucket: "imagigram-10450.appspot.com",
  messagingSenderId: "953031958132",
  appId: "1:953031958132:web:9ae34ab0fd2e6b173cbb21"
  };

export const app = initializeApp(firebaseConfig);
//aqui é para pegar o app do firestore para ser utilizado através da constante db
export const db = getFirestore(app);

