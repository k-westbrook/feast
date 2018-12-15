import axios from 'axios'


//ACTION TYPE
const GET_LOGGED_IN_USER_FROM_SERVER = "GET_LOGGED_IN_USER_FROM_SERVER";
const ADD_USER_TO_SERVER = "ADD_USER_TO_SERVER";


//ACTION CREATOR
const getLoggedInUser = (user) => ({

  type: GET_LOGGED_IN_USER_FROM_SERVER,
  user
})
const addUserToServer = (user) => ({

  type: ADD_USER_TO_SERVER,
  user
})

//INITIAL STATE
const initialState = {
  selectedUser: {}
}


//THUNK CREATORS

export const login = (formData) => {
  return async (dispatch) => {

    const res = await axios.put('/api/auth/login/', formData);
    const data = res.data;
    dispatch(getLoggedInUser(data));
  }
}

export const getMe = () => {
  return async (dispatch) => {

    const res = await axios.get('/api/auth/me');

    const data = res.data;

    dispatch(getLoggedInUser(data));
  }
}

export const logout = () => {
  return async (dispatch) => {
    await axios.delete('/api/auth/logout');
    dispatch(getLoggedInUser(initialState.selectedUser));
  }
}

export const addUser = (user) => {
  return async (dispatch) => {

    const res = await axios.post('/api/auth/addUser', user);
    const data = res.data;
    dispatch(addUserToServer(data));
  }
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER_FROM_SERVER:
      return { ...state, selectedUser: action.user }
    case ADD_USER_TO_SERVER:
      return { ...state, selectedUser: action.user }

    default:
      return state
  }
}

export default userReducer
