import { createContext, useEffect, useReducer, useState } from 'react';
import { song_list } from './songs';
import axios from 'axios';

const MusicContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SONGS_ARRAY':
      return {
        ...state,
        songslist: action.data,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: action.data,
        playing: true,
      };
    case 'TOGGLE_RANDOM':
      return {
        ...state,
        random: action.data,
      };
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        repeat: action.data,
      };
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        playing: action.data,
      };
    default:
      return state;
  }
};

export const MusicContextProvider = (props) => {
  const initialState = {
    currentSong: 0,
    songslist: song_list,
    repeat: false,
    random: false,
    playing: false,
    audio: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set songs array
  const songsSet = (songArr) =>
    dispatch({ type: 'SET_SONGS_ARRAY', data: songArr });
  // Set playing state
  const togglePlaying = () =>
    dispatch({ type: 'TOGGLE_PLAYING', data: state.playing ? false : true });
  // Set current song
  const SetCurrent = (id) => {
    dispatch({ type: 'SET_CURRENT_SONG', data: id });
    console.log(state.currentSong);
  };

  // Prev song
  const prevSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    }

    if (state.currentSong === 0) {
      return SetCurrent(state.songslist.length - 1);
    } else {
      return SetCurrent(state.currentSong - 1);
    }
  };
  // Next song
  const nextSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    }
    if (state.currentSong === state.songslist.length - 1) {
      SetCurrent(0);
    } else {
      SetCurrent(state.currentSong + 1);
    }
  };

  // Repeat and Random
  const toggleRepeat = (id) =>
    dispatch({ type: 'TOGGLE_REPEAT', data: state.repeat ? false : true });
  const toggleRandom = (id) =>
    dispatch({ type: 'TOGGLE_RANDOM', data: state.random ? false : true });

  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    } else {
      if (state.repeat) {
        nextSong();
      } else if (state.currentSong === state.songslist.length - 1) {
        return;
      } else {
        nextSong();
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong: state.currentSong,
        // songs: state.songs,
        songslist: state.songslist,
        repeat: state.repeat,
        random: state.random,
        playing: state.playing,
        audio: state.audio,
        nextSong,
        prevSong,
        SetCurrent,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        songsSet,
      }}
    >
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
