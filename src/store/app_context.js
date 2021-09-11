/* eslint-disable no-unused-vars */
import { createContext, useReducer } from 'react';

const useStore = () => {
  const appState = {
    events: [],
    filteredEvents: [],
    ads: [],
    filteredAds: [],
    eventTypes: [],
    adTypes: [],
    users: []
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_EVENTS':
        return { ...state, events: action.payload.events };
      case 'FILTER_EVENTS':
        return { ...state, filteredEvents: action.payload.filteredEvents };
      case 'CHANGE_ADS':
        return { ...state, ads: action.payload.ads };
      case 'FILTER_ADS':
        return { ...state, filteredAds: action.payload.filteredAds };
      case 'CHANGE_EVENT_TYPES':
        return { ...state, eventTypes: action.payload.eventTypes };
      case 'CHANGE_AD_TYPES':
        return { ...state, adTypes: action.payload.adTypes };
      case 'CHANGE_USERS':
        return { ...state, users: action.payload.users };
      default:
        throw new Error();
    }
  }

  const [state, dispatchStore] = useReducer(reducer, appState);

  return { dispatchStore, state };
};

const appContext = createContext();

export default appContext;

export { useStore };
