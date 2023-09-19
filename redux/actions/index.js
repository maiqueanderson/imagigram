// import { getAuth } from "firebase/auth";
// import { app, db } from "../../database/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { USER_STATE_CHANGE } from "../constants";


// //aqui é a estrutura do firebase para pegar os dados do usuario que está logado
// export const fetchUser = () =>{
//     return (dispatch) =>{
//         const auth = getAuth(app); 
//         const uid = auth.currentUser.uid;
//         const docRef = doc(db, 'users', uid);

//         getDoc(docRef).then((snapshot) => {
//             if(snapshot.exists){
//                 const data = snapshot.data();
//                 console.log('data', data);
//                 dispatch({
//                     type: USER_STATE_CHANGE,
//                     currentUser: {
//                         //spreed para poder acessar o objeto currentUser de forma mais facil
//                         ...data,
//                         uid
//                     }
//                 });

//             } else{
//                 console.log('Action Fech User: User does not exists ' );
//             }
//         });
//     };
// };

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { app, db } from "../../database/firebaseConfig";
import { USER_STATE_CHANGE } from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const auth = getAuth(app);
    const udi = auth.currentUser.uid;
    const docRef = doc(db, 'users', udi);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        console.log('data', data);
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: { ...data, udi }
        });
      } else {
        console.log('Action Fetch User: User does not exists');
      }
    })
  }
}