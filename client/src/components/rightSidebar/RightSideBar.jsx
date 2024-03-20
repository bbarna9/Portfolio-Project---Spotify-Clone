import Scrollbars from 'react-custom-scrollbars';
import './rightSideBar.scss';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/Player';
import MusicContext from '../../context/MusicContext';
import { useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_AUTHOR_START':
      return { ...state, loading: true };
    case 'FETCH_AUTHOR_SUCCESS':
      return { ...state, author: action.payload, loading: false };
    case 'FETCH_AUTHOR_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

let currentAuthor = {};

const RightSideBar = () => {
  const { state, ctxDispatch } = useContext(PlayerContext);
  const { songslist, currentSong } = useContext(MusicContext);
  const { isOpen } = state;

  const closeHandler = async (e) => {
    e.preventDefault();
    try {
      ctxDispatch({ type: 'SIDEBAR_CLOSE' });
    } catch (err) {
      console.log(err);
    }
  };

  const [{ loading, error, author }, dispatch] = useReducer(reducer, {
    author: {},
    loading: true,
    error: '',
  });

  const key = songslist[currentSong].authorKey;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_AUTHOR_START' });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/authors/key/${key}`,
          {
            headers: {
              token:
                'Bearer: ' +
                JSON.parse(localStorage.getItem('userInfo')).accessToken,
            },
          }
        );
        dispatch({ type: 'FETCH_AUTHOR_SUCCESS', payload: result.data });
        currentAuthor = result.data[0];
        //songslist[currentSong] = pickedSong;
      } catch (err) {
        dispatch({ type: 'FETCH_AUTHOR_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, [songslist[currentSong]]);

  // A FELTÉTELT ÁTÍRNI CURRENTSONGRA
  return (
    <div
      className={
        songslist.lenth !== 0 && isOpen ? 'rightsidebar' : 'rightsidebar closed'
      }
    >
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={300}
        style={{ height: '100%', width: '100%' }}
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
      >
        <div className="onPlay">
          <div className="song">
            <div className="header">
              <h3 className="albumTitle">{songslist[currentSong]?.albumKey}</h3>
              <i className="close fa-solid fa-xmark" onClick={closeHandler}></i>
            </div>
            <img src={songslist[currentSong]?.coverImg} alt="" />
            <div className="bottom">
              <div className="left">
                <h1 className="songTitle">{songslist[currentSong]?.title}</h1>
                <Link to="/author" className="infoSinger">
                  {currentAuthor?.name}
                </Link>
              </div>
              <div className="right">
                <i className="icon fa-solid fa-ellipsis"></i>
              </div>
            </div>
          </div>
          <div className="singer">
            <div className="top">
              <span>Az előadóról</span>
              <img src={currentAuthor?.descImg} alt="" />
            </div>
            <div className="bottom">
              <Link to="/author" className="name">
                {currentAuthor?.name}
              </Link>
              <div className="stats">
                <span>{currentAuthor?.listeners} hallgató havonta</span>
                <button className="followButton">Követés</button>
              </div>
              <p className="desc">{currentAuthor?.desc}</p>
            </div>
          </div>
          <div className="authors">
            <div className="head">
              <h3 className="title">Alkotók</h3>
              <span>Összes</span>
            </div>
            <div className="list">
              <div className="author">
                <Link to="/author" className="name">
                  {currentAuthor?.name}
                </Link>
                <div className="authorTitle">Fő előadó, Producer</div>
              </div>
              <div className="author">
                <div className="name">Andrew Watt</div>
                <div className="authorTitle">Zeneszerző, Producer</div>
              </div>
              <div className="author">
                <div className="name">Loius Bell</div>
                <div className="authorTitle">Zeneszerző, Producer</div>
              </div>
            </div>
          </div>
          <div className="tour">
            <div className="head">
              <h3 className="title">Turnén</h3>
              <span>Összes</span>
            </div>
            <div className="tourDates">
              <div className="tourDate">
                <div className="left">
                  <span className="month">Febr.</span>
                  <span className="day">3</span>
                </div>
                <div className="right">
                  <div className="info">
                    <div className="location">Scottscdale</div>
                    <div className="name">Post Malone</div>
                    <div className="time">Szo 14:30 • TPC Scottscdale</div>
                  </div>
                </div>
              </div>
              <div className="tourDate">
                <div className="left">
                  <span className="month">Febr.</span>
                  <span className="day">3</span>
                </div>
                <div className="right">
                  <div className="info">
                    <div className="location">Scottscdale</div>
                    <div className="name">Post Malone</div>
                    <div className="time">Szo 14:30 • TPC Scottscdale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="merch">
            {/* -------------- MEGCSINÁLNI --------------- */}
          </div>
          <div className="currently">
            <div className="head">
              <h3 className="title">Műsoron</h3>
              <span>Műsor megnyitása</span>
            </div>
            <div className="nextSong">
              <i className="songIcon fa-solid fa-music"></i>
              <i className="playIcon fa-solid fa-play"></i>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="songInfo">
                <span className="title">7 min freestyle</span>
                <span className="singer">21 Savage</span>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default RightSideBar;
