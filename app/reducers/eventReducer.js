import axios from 'axios'
import { getMe } from './userReducer';


//ACTION TYPE
const GET_EVENTS_FROM_SERVER = "GET_USERS_EVENT_FROM_SERVER";
const GET_EVENT_FROM_SERVER = "GET_EVENT_FROM_SERVER";
const GET_GUESTS_FROM_SERVER = "GET_GUESTS_FROM_SERVER";
const GET_ITEMS_FROM_SERVER = "GET_ITEMS_FROM_SERVER";
const ADD_EVENT = "ADD_EVENT";
const ADD_GUEST = "ADD_GUEST";
const REMOVE_GUEST = "REMOVE_GUEST";
const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"
const UPDATE_ITEM = "UPDATE_ITEM"

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
const getItemsFromServer = (items) => ({

  type: GET_ITEMS_FROM_SERVER,
  items
})
const addedEventFromServer = (event) => ({

  type: ADD_EVENT,
  event

})

const addedGuestFromServer = (guest) => ({
  type: ADD_GUEST,
  guest
})

const addedItemFromServer = (item) => ({
  type: ADD_ITEM,
  item
})

const deletedGuestFromServer = (guest) => ({
  type: REMOVE_GUEST,
  guest
})
const deletedItemFromServer = (item) => ({
  type: REMOVE_ITEM,
  item
})

const updatedItemFromServer = (item) => ({
  type: UPDATE_ITEM,
  item
})

//INITIAL STATE
const initialState = {
  selectedEvent: {},
  guests: [],
  events: [],
  items: []
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

    dispatch(getGuestsFromServer(data));
  }
}

export const getItems = (eventId) => {
  return async (dispatch) => {

    const res = await axios.get(`/api/events/items/${eventId}`);
    const data = res.data;
    dispatch(getItemsFromServer(data));
  }
}

export const addGuest = (guest, eventId) => {
  return async (dispatch) => {

    const res = await axios.put(`/api/events/addGuest/${eventId}`, guest);
    const data = res.data;
    dispatch(addedGuestFromServer(data));
  }
}


export const addItem = (item, eventId) => {
  return async (dispatch) => {

    const res = await axios.post(`/api/events/addItem/${eventId}`, item);
    const data = res.data;
    dispatch(addedItemFromServer(data));
  }
}

export const updateItem = (item, eventId, itemId) => {
  return async (dispatch) => {

    const res = await axios.put(`/api/events/updateItem/${eventId}/${itemId}`, item);
    const data = res.data;
    dispatch(updatedItemFromServer(data));
  }
}


export const removeGuest = (eventId, userId) => {
  return async (dispatch) => {

    const res = await axios.delete(`/api/events/removeGuest/${eventId}/${userId}`);

    const data = res.data;
    dispatch(deletedGuestFromServer(data));
  }
}

export const removeItem = (itemId) => {
  return async (dispatch) => {

    const res = await axios.delete(`/api/events/removeItem/${itemId}`);
    const data = res.data;

    dispatch(deletedItemFromServer(data));
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
    case GET_ITEMS_FROM_SERVER:
      return { ...state, items: action.items }
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.event] }
    case ADD_GUEST:
      return { ...state, guests: [...state.guests, action.guest] }
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] }
    case REMOVE_GUEST: {

      let newGuestArr = [];
      for (let i = 0; i < state.guests.length; i++) {
        console.log(action.guest, "ACTION")
        if (state.guests[i].id !== action.guest.id) {
          newGuestArr.push(state.guests[i]);
        }
      }
      return { ...state, guests: newGuestArr }
    }
    case REMOVE_ITEM: {

      let newItemArr = [];
      for (let i = 0; i < state.items.length; i++) {

        if (state.items[i].id !== action.item.id) {

          newItemArr.push(state.items[i]);
        }
      }

      return { ...state, items: newItemArr }
    }
    case UPDATE_ITEM: {
      console.log(action.item, "REDUCER")
      let newItemArr = [];
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id !== action.item.id) {
          newItemArr.push(state.items[i]);
        } else {
          newItemArr.push(action.item);
        }
      }

      return { ...state, items: newItemArr }
    }
    default:
      return state
  }
}

export default eventReducer
