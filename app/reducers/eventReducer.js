import axios from 'axios'
import { getMe } from './userReducer';


//ACTION TYPE
const GET_EVENTS_FROM_SERVER = "GET_USERS_EVENT_FROM_SERVER";
const GET_EVENT_FROM_SERVER = "GET_EVENT_FROM_SERVER";
const GET_GUESTS_FROM_SERVER = "GET_GUESTS_FROM_SERVER";
const ADD_EVENT = "ADD_EVENT";
const ADD_GUEST = "ADD_GUEST";

//ACTION CREATOR
const getAllEventsForUser = (events) => ({

  type: GET_EVENTS_FROM_SERVER,
  events
})

const getEventFromServer = (event) => ({

  type: GET_EVENT_FROM_SERVER,
  event
})
const getGuestsFromServer = (guests) => ({

  type: GET_GUESTS_FROM_SERVER,
  guests
})

const addedEventFromServer = (event) => ({

  type: ADD_EVENT,
  event

})

const addedGuestFromServer = (guest) => ({
  type: ADD_GUEST,
  guest
})

//INITIAL STATE
const initialState = {
  selectedEvent: {},
  guests: [],
  events: []
}


//THUNK CREATORS
//getEvents --> gets all the events associated with a particular user
export const getEvents = (userId) => {
  return async (dispatch) => {

    const res = await axios.get(`/api/events/${userId}/events`);
    const data = res.data;
    dispatch(getAllEventsForUser(data));
  }
}

export const addEvent = (event) => {
  return async (dispatch) => {

    const res = await axios.post(`/api/events/createEvent`, event);
    const data = res.data;
    dispatch(addedEventFromServer(data));
  }
}


export const getEvent = (eventId) => {
  return async (dispatch) => {

    const res = await axios.get(`/api/events/${eventId}`);
    const data = res.data;
    dispatch(getEventFromServer(data));
  }
}



export const getGuests = (eventId) => {
  return async (dispatch) => {

    const res = await axios.get(`/api/events/guests/${eventId}`);
    const data = res.data;
    console.log("REDUCER", data)
    dispatch(getGuestsFromServer(data));
  }
}

export const addGuest = (guest) => {
  return async (dispatch) => {

    const res = await axios.put(`/api/events/addGuest`, guest);
    const data = res.data;
    console.log("REDUCER", data)
    dispatch(addGuest(data));
  }
}




const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT_FROM_SERVER:
      return { ...state, selectedEvent: action.event }
    case GET_GUESTS_FROM_SERVER:
      return { ...state, guests: action.guests }
    case GET_EVENTS_FROM_SERVER:
      return { ...state, events: action.events, selectedEvent: {} }
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.event] }
    case ADD_GUEST:
      return { ...state, guests: [...state.guests, action.guest] }
    default:
      return state
  }
}

export default eventReducer
