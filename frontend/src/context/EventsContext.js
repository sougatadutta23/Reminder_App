import { createContext, useReducer } from "react";

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
  // dispatch function gives us the action and the payload
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        events: action.payload
      };
    case 'CREATE_EVENT':
      return {
        events: [action.payload, ...state.events] // state gives the prev_value of events array
      };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter((val) => {
          return val._id !== action.payload._id;
        })
      };
    default:
      return state;
  }
};

export const EventsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null
  });

  return (
    <EventsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};
