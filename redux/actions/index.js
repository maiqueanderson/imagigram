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
import { doc, getDoc, collection, query, getDocs  } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import { 
  USER_STATE_CHANGE,
  USER_POST_CHANGE
} from '../constants';

import { app, db }  from '../../database/firebaseConfig';

export const fetchUser = () => {
  return (dispatch) => {
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const docRef = doc(db, "users", uid);
    
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          dispatch({ type: USER_STATE_CHANGE, currentUser: { ...data, uid } });
        } else {
          console.log('Action Fetch User: User does not exists')
        }
      });
  };
};

export const fetchUserPosts = () => {
  return async (dispatch) => {
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const postsRef = collection(db, "posts")

    const queryPosts = query(collection(postsRef, uid, 'userPosts'));
    const querySnapshot = await getDocs(queryPosts);

    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    dispatch({ type: USER_POST_CHANGE, posts });

  };
};