import Navbar from '../../components/navBar/Navbar';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import './favourites.scss';
import data from '../../albumData.json';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import MusicContext from '../../context/MusicContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_START':
      return { ...state, loading: true };
    case 'FETCH_SONGS_SUCCESS':
      return { ...state, songs: action.payload, loading: false };
    case 'FETCH_SONGS_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const Favourites = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fav, setFav] = useState([
    ...JSON.parse(localStorage.getItem('userInfo')).likedSongs,
  ]);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const [{ loading, error, songs }, dispatch] = useReducer(reducer, {
    songs: {},
    loading: true,
    error: '',
  });

  window.addEventListener('storage', () => {
    setFav((prev) => JSON.parse(localStorage.getItem('userInfo')).likedSongs);
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_SONGS_START' });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/users/${user._id}/favourites`,
          {
            headers: {
              token:
                'Bearer: ' +
                JSON.parse(localStorage.getItem('userInfo')).accessToken,
            },
          }
        );
        dispatch({
          type: 'FETCH_SONGS_SUCCESS',
          payload: result.data[0].songs,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_SONGS_FAILURE', payload: error.message });
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleScroll = (event) => {
    setIsScrolled(event.currentTarget.scrollTop === 0 ? false : true);
  };

  const handleFavourited = async (e, songId) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        {
          headers: {
            token:
              'Bearer: ' +
              JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
          songId,
        }
      );
      if (user.likedSongs.includes(songId)) {
        const index = user.likedSongs.indexOf(songId);
        if (index > -1) {
          user.likedSongs.splice(index, 1);
          setFav(user.likedSongs);
        }
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      } else {
        user.likedSongs.push(songId);
        setFav(user.likedSongs);
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="favourites">
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="container" onScroll={handleScroll}>
            <div
              className="mainContainer"
              style={{
                background: `linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.9080882352941176) 6%, rgba(74,54,143,1) 100%)`,
              }}
            >
              <div className="header">
                <div className="left">
                  <img src="/public/likedsongs.png" alt="" />
                </div>
                <div className="right">
                  <span className="type">Album</span>
                  <h1 className="albumTitle">Kedvelt dalok</h1>
                  <div className="bottomInfo">
                    {user?.profilePic !== '' ? (
                      <img src={user?.profilePic} alt="" />
                    ) : (
                      <i className="icon fa-solid fa-user"></i>
                    )}
                    <span className="date">{user.username}</span> •
                    <span className="length">{songs.length} dal</span>
                  </div>
                </div>
              </div>
              <div className="list">
                <div className="top">
                  <div className="left">
                    <i className="icon play fa-solid fa-circle-play fa-4x"></i>
                    <i className="icon shuffle fa-solid fa-shuffle fa-2x"></i>
                    <i className="icon add fa-solid fa-circle-plus fa-2x"></i>
                    <i className="icon download fa-solid fa-circle-down fa-2x"></i>
                    <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
                  </div>
                  <div className="right">
                    <span>Lista</span>
                    <i className="icon fa-solid fa-list"></i>
                  </div>
                </div>
                <div className="thead">
                  <div className="left">
                    <span className="hashtag">#</span>
                    <span>Cím</span>
                  </div>
                  <div className="right">
                    <div className="span">Lejátszások</div>
                    <i className="clockIcon fa-regular fa-clock"></i>
                  </div>
                </div>
                <div className="bottom">
                  {songs?.map((song, id) => (
                    <div key={id} className="song">
                      <div className="left">
                        <div className="number">{id + 1}</div>
                        <i className="playIcon fa-solid fa-play"></i>
                        <img
                          src={song.coverImg}
                          alt=""
                          className="albumCover"
                        />
                        <div className="info">
                          <a
                            href={`/albums/key/${song.albumKey}`}
                            className="title"
                          >
                            {song.title}
                          </a>
                          <a
                            href={`/authors/key/${song.authorKey}`}
                            className="singer"
                          >
                            {song.author}
                          </a>
                        </div>
                      </div>
                      <div className="right">
                        <div className="plays">{song.listens}</div>
                        <div className="end">
                          <i className="add fa-solid fa-plus fa-lg"></i>
                          <div className="length">{song.length}</div>
                          <div className="like">
                            <i
                              className={
                                fav.includes(song._id)
                                  ? 'like liked fa-solid fa-heart fa-lg'
                                  : 'like fa-regular fa-heart fa-lg'
                              }
                              onClick={(e) => {
                                handleFavourited(e, song._id);
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="footer">
                  <div className="releaseDate"></div>
                  <div className="copyright"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;
