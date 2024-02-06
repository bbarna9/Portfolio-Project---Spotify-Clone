import { useContext, useState, useRef, useEffect } from 'react';
import './bottomBar.scss';
import WaveSurfer from 'wavesurfer.js';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/Player.jsx';

import audioFile from '../../assets/Audio.mp3';
import MusicContext from '../../context/MusicContext.jsx';
import axios from 'axios';

const BottomBar = () => {
  const { state, dispatch } = useContext(PlayerContext);
  // const { isOpen, currentSong } = state;
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
      dispatch({ type: 'SIDEBAR_TOGGLE' });
      setVisible(!visible);
    } catch (err) {
      console.log(err);
    }
  };

  const playlistHandler = async (e) => {
    e.preventDefault();
    if (!plist) {
      try {
        dispatch({ type: 'PLAYLIST_TOGGLE' });
        navigate('/playlist');
        setPlist(!plist);
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({ type: 'PLAYLIST_TOGGLE' });
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
  };

  useEffect(() => {
    audio.current.volume = statevolum;
    if (playing) {
      toggleAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  // A FELTÉTELT ÁTÍRNI CURRENTSONGRA
  return (
    <div className={isOpen ? 'bottombar opened' : 'bottombar closed'}>
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
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
          <Link to="/album">
            <img
              src={songslist.length != 0 ? songslist[currentSong].coverImg : ''}
              alt="album"
            />
          </Link>
        )}
        <div className="info">
          <Link to="/album" className="title">
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
            <input
              onChange={handleProgress}
              value={dur ? (currentTime * 100) / dur : 0}
              type="range"
              name="progresBar"
              className="progressBar"
              id="prgbar"
            />
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
            <input
              value={Math.round(statevolum * 100)}
              type="range"
              name="volBar"
              id="volume"
              onChange={(e) => handleVolume(e.target.value / 100)}
            />
          </div>
        </div>
        <i className="icon fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
    </div>
  );
};

export default BottomBar;
