import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      return {
        ...state, 
        contacts: [...state.contacts, action.payload]
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => contact._id === action.payload._id ? action.payload : contact)
      }
    default:
       return state;
  }
}