import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  isOpen: true,
};

export const PlayerContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SIDEBAR_CLOSE':
      return { ...state, isOpen: false };
    case 'SIDEBAR_TOGGLE': {
      const res = state.isOpen;
      if (res === true) {
        return { ...state, isOpen: false };
      } else {
        return { ...state, isOpen: true };
      }
    }
    default:
      return { ...state };
  }
}

export const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <PlayerContext.Provider value={{ isOpen: state.isOpen, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
