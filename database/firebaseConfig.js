
//essas são as credenciais e configurações do firebase

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
   
    
  };

export const app = initializeApp(firebaseConfig);
//aqui é para pegar o app do firestore para ser utilizado através da constante db
export const db = getFirestore(app);

