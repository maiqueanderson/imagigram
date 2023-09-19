// const initialState = {
//     currentUser: null
// };

// const userReducers = (state = initialState, action) =>{
//     return{
//         //dessa forma da para pegar as informações de um objeto e alterar uma propriedade dele
//         ...state,
//         currentUser: action.currentUser
//     }
// };

// export default userReducers;

const initialState = {
    currentUser: null
  };
  
  const userReducer = (state = initialState, action) => {
    return {
      ...state,
      currentUser: action.currentUser
    }
  }
  
  export default userReducer;