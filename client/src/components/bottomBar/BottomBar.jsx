import { useContext, useState, useRef, useEffect, useReducer } from 'react';
import './bottomBar.scss';
import WaveSurfer from 'wavesurfer.js';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/Player.jsx';

import audioFile from '../../assets/Audio.mp3';
import MusicContext from '../../context/MusicContext.jsx';
import axios from 'axios';
import Slider from '../slider/Slider.jsx';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONG_START':
      return { ...state, loading: true };
    case 'FETCH_SONG_SUCCESS':
      return { ...state, song: action.payload, loading: false };
    case 'FETCH_SONG_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const BottomBar = () => {
  const { state, ctxDispatch } = useContext(PlayerContext);
  // const { isOpen, currentSong } = state;
  const [{ loading, error, song }, dispatch] = useReducer(reducer, {
    songs: [],
    loading: true,
    error: '',
  });

  const { isOpen, playlist } = state;
  const current = 'wer';

  const navigate = useNavigate();

  const [visible, setVisible] = useState(isOpen);
  const [plist, setPlist] = useState(playlist);

  useEffect(() => {
    if (window.location.pathname === '/playlist') {
      setPlist(true);
    } else {
      setPlist(false);
    }
  }, [plist, window.location.pathname]);

  const sidebarHandler = async (e) => {
    e.preventDefault();
    try {
      ctxDispatch({ type: 'SIDEBAR_TOGGLE' });
      setVisible(!visible);
    } catch (err) {
      console.log(err);
    }
  };

  const playlistHandler = async (e) => {
    e.preventDefault();
    if (!plist) {
      try {
        ctxDispatch({ type: 'PLAYLIST_TOGGLE' });
        navigate('/playlist');
        setPlist(!plist);
      } catch (err) {
        console.log(err);
      }
    } else {
      ctxDispatch({ type: 'PLAYLIST_TOGGLE' });
      navigate(-1);
      setPlist(!plist);
    }
  };

  // Global State
  const {
    currentSong,
    nextSong,
    prevSong,
    repeat,
    random,
    playing,
    toggleRandom,
    toggleRepeat,
    togglePlaying,
    handleEnd,
    songslist,
  } = useContext(MusicContext);

  const audio = useRef('audio_tag');

  // self State
  const [statevolum, setStateVolum] = useState(0.5);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [prevVol, setPrevVol] = useState(statevolum);
  const [percentage, setPercentage] = useState(0);

  let volumePower;

  if (statevolum > 0 && statevolum < 0.33) {
    volumePower = 'icon fa-solid fa-volume-off';
  } else if (statevolum >= 0.33 && statevolum < 0.66) {
    volumePower = 'icon fa-solid fa-volume-low';
  } else if (statevolum >= 0.66) {
    volumePower = 'icon fa-solid fa-volume-high';
  } else {
    volumePower = 'icon fa-solid fa-volume-xmark';
  }

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause();

  const handleVolume = (q) => {
    setStateVolum(q);
    audio.current.volume = q;
  };

  const handleMute = () => {
    if (!muted) {
      setMuted(true);
      setPrevVol(statevolum);
      setStateVolum(0);
      audio.current.volume = 0;
    } else {
      setMuted(false);
      setStateVolum(prevVol);
      audio.current.volume = prevVol;
    }
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
    // audio.current.currentTime = (audio.current.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const onChange = (e) => {
    setPercentage(e.target.value);
  };

  useEffect(() => {
    audio.current.volume = statevolum;
    const pickedSong = JSON.parse(localStorage.getItem('currentSong'));
    if (playing) {
      toggleAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  /* useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUM_START' });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/songs/${pickedSong._id}`
        );
        dispatch({ type: 'FETCH_SONG_SUCCESS', payload: result.data });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_SONG_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []); */

  // A FELTÉTELT ÁTÍRNI CURRENTSONGRA
  return (
    <div className={isOpen ? 'bottombar opened' : 'bottombar closed'}>
      <audio
        // onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onTimeUpdate={getCurrDuration}
        onCanPlay={(e) => setDur(e.target.duration)}
        onEnded={handleEnd}
        ref={audio}
        type="audio/mpeg"
        src={songslist.length != 0 ? songslist[currentSong].link : ''}
      />
      <div className="left">
        {songslist.length === 0 ? (
          ''
        ) : (
          <Link to={`/albums/key/${songslist[currentSong].albumKey}`}>
            <img
              src={songslist.length != 0 ? songslist[currentSong].coverImg : ''}
              alt="album"
            />
          </Link>
        )}
        <div className="info">
          <Link
            to={`/albums/key/${songslist[currentSong].albumKey}`}
            className="title"
          >
            {/* {current !== null ? audioFileName : ''} */}
            {songslist.length != 0 ? songslist[currentSong].title : ''}
          </Link>
          <Link to="/author" className="singer">
            {/* {current !== null ? 'Post Malone' : ''} */}
            {songslist.length != 0 ? songslist[currentSong].author : ''}
          </Link>
        </div>
      </div>
      <div className="center">
        <div className="top">
          <i
            className={
              random
                ? 'active icon shuffle fa-solid fa-shuffle fa-lg'
                : 'icon shuffle fa-solid fa-shuffle fa-lg'
            }
            onClick={toggleRandom}
          ></i>
          <i
            className="icon goBack fa-solid fa-backward-step fa-lg"
            onClick={prevSong}
          ></i>
          {/* ----- PLAY / PAUSE BUTTON ----- */}
          <i
            onClick={() => {
              togglePlaying();
              toggleAudio();
            }}
            className={
              playing
                ? 'icon pause fa-solid fa-circle-pause fa-2xl'
                : 'icon pause fa-solid fa-circle-play fa-2xl'
            }
          ></i>
          <i
            className="icon goForward fa-solid fa-forward-step fa-lg"
            onClick={nextSong}
          ></i>
          <i
            className={
              repeat
                ? 'active icon repeat fa-solid fa-repeat fa-lg'
                : 'icon repeat fa-solid fa-repeat fa-lg'
            }
            onClick={toggleRepeat}
          ></i>
        </div>
        <div className="bottom">
          <span className="length">{fmtMSS(currentTime)}</span>

          <div className="progressContainer">
            <Slider
              onChange={handleProgress}
              percentage={percentage}
              // value={dur ? (currentTime * 100) / dur : 0}
            />
            {/* <input
              onChange={handleProgress}
              value={dur ? (currentTime * 100) / dur : 0}
              type="range"
              name="progresBar"
              className="progressBar"
              id="prgbar"
            /> */}
          </div>
          {/* <span className="length">{fmtMSS(dur)}</span> */}
          <span className="length">
            {songslist.length !== 0 ? songslist[currentSong].length : '0:00'}
          </span>
        </div>
      </div>
      <div className="right">
        <i
          className="sideOpen fa-regular fa-square-caret-right"
          onClick={sidebarHandler}
        ></i>
        <i className="icon fa-solid fa-microphone"></i>
        <i
          className={
            plist
              ? 'plist active icon fa-solid fa-bars'
              : 'plist icon fa-solid fa-bars'
          }
          onClick={playlistHandler}
        ></i>
        <i className="icon fa-solid fa-computer"></i>
        <div className="volumeProgress">
          <i onClick={handleMute} className={volumePower}></i>
          <div className="volumeBar">
            <Slider
              onChange={(e) => handleVolume(e.target.value / 100)}
              percentage={Math.round(statevolum * 100)}
            />
            {/* <input
              value={Math.round(statevolum * 100)}
              type="range"
              name="volBar"
              id="volume"
            /> */}
          </div>
        </div>
        <i className="icon fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
    </div>
  );
};

export default BottomBar;
