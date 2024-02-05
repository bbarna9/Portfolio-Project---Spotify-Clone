import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  isOpen: true,
  currentSong: null,
};

export const PlayerContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
      };
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
    case 'PICK_SONG':
      return { ...state, currentSong: action.payload };
    default:
      return { ...state };
  }
}

export const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = { state, dispatch };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
