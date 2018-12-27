import axios from 'axios'


//ACTION TYPE
const GET_LOGGED_IN_USER_FROM_SERVER = "GET_LOGGED_IN_USER_FROM_SERVER";
const ADD_USER_TO_SERVER = "ADD_USER_TO_SERVER";
const GET_ITEMS_FROM_SERVER = 'GET_ITEMS_FROM_SERVER'


//ACTION CREATOR
const getLoggedInUser = (user) => ({

  type: GET_LOGGED_IN_USER_FROM_SERVER,
  user
})
const addUserToServer = (user) => ({

  type: ADD_USER_TO_SERVER,
  user
})
const getItemsFromServer = (items) => ({

  type: GET_ITEMS_FROM_SERVER,
  items
})

//INITIAL STATE
const initialState = {
  selectedUser: {},
  items: []
}


//THUNK CREATORS

export const login = (formData) => {
  return async (dispatch) => {

    const res = await axios.put('/api/auth/login/', formData);
    const data = res.data;
    if (data.incorrect) {
      return true;
    } else {
      dispatch(getLoggedInUser(data));
    }
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
    if (!data.taken) {
      dispatch(addUserToServer(data));
    } else {
      return true;
    }
  }
}

export const getItemsForUser = (userId) => {
  return async (dispatch) => {

    const res = await axios.get(`/api/users/${userId}/items`);
    const data = res.data;
    dispatch(getItemsFromServer(data));
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER_FROM_SERVER:
      return { ...state, selectedUser: action.user }
    case ADD_USER_TO_SERVER:
      return { ...state, selectedUser: action.user }
    case GET_ITEMS_FROM_SERVER:
      return { ...state, items: action.items }

    default:
      return state
  }
}

export default userReducer
