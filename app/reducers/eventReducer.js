import axios from 'axios'


//ACTION TYPE
const GET_EVENTS_FROM_SERVER = "GET_USERS_EVENT_FROM_SERVER";
const GET_EVENT_FROM_SERVER = "GET_EVENT_FROM_SERVER";
const GET_GUESTS_FROM_SERVER = "GET_GUESTS_FROM_SERVER";
const ADD_EVENT = "ADD_EVENT";

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

export const addEvent = (event, userId) => {
  return async (dispatch) => {

    const res = await axios.post(`/api/events/${userId}/createEvent`, event);
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
    const data = res.data.users;

    dispatch(getGuestsFromServer(data));
  }
}



const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT_FROM_SERVER:
      return { ...state, selectedEvent: action.event }
    case GET_GUESTS_FROM_SERVER:
      return { ...state, guests: action.guests }
    case GET_EVENTS_FROM_SERVER:
      return { ...state, events: action.events }
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.event] }
    default:
      return state
  }
}

export default eventReducer
