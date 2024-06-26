import Navbar from '../../components/navBar/Navbar';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import './album.scss';
import data from '../../albumData.json';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import MusicContext from '../../context/MusicContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALBUM_START':
      return { ...state, loading: true };
    case 'FETCH_ALBUM_SUCCESS':
      return { ...state, album: action.payload, loading: false };
    case 'FETCH_ALBUM_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const Album = () => {
  let { songsSet, currentSong, SetCurrent, songslist } =
    useContext(MusicContext);

  let currentAlbum;

  const [isScrolled, setIsScrolled] = useState(false);

  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState([
    ...JSON.parse(localStorage.getItem('userInfo')).likedSongs,
  ]);
  const [favAlbums, setFavAlbums] = useState([
    ...(JSON.parse(localStorage.getItem('userInfo')).likedAlbums || []),
  ]);
  console.log(favAlbums);

  let user = JSON.parse(localStorage.getItem('userInfo'));

  const [{ loading, error, album }, dispatch] = useReducer(reducer, {
    album: {},
    loading: true,
    error: '',
  });

  const { key } = useParams();

  const id = JSON.parse(localStorage.getItem('userInfo'))._id;

  const playHandler = (song) => {
    songslist.push(song);
    localStorage.setItem('currentSong', JSON.stringify(song));
    songsSet(songslist);
    SetCurrent(songslist.length - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUM_START' });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/albums/key/${key}`,
          {
            headers: {
              token:
                'Bearer: ' +
                JSON.parse(localStorage.getItem('userInfo')).accessToken,
            },
          }
        );
        dispatch({ type: 'FETCH_ALBUM_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ALBUM_FAILURE', payload: error.message });
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
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, {
        headers: {
          token:
            'Bearer: ' +
            JSON.parse(localStorage.getItem('userInfo')).accessToken,
        },
        songId,
      });
      if (user.likedSongs.includes(songId)) {
        const index = user.likedSongs.indexOf(songId);
        const index2 = fav.indexOf(songId);
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

  const handleAlbumFavourited = async (e, albumId) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, {
        headers: {
          token:
            'Bearer: ' +
            JSON.parse(localStorage.getItem('userInfo')).accessToken,
        },
        albumId,
      });
      if (user.likedAlbums.includes(albumId)) {
        console.log(1);
        const index = user.likedAlbums.indexOf(albumId);
        if (index > -1) {
          user.likedAlbums.splice(index, 1);
          setFavAlbums(user.likedAlbums);
        }
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      } else {
        console.log(1);
        user.likedAlbums.push(albumId);
        setFavAlbums(user.likedAlbums);
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="album">
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="container" onScroll={handleScroll}>
            <div
              className="mainContainer"
              style={{
                background: `linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.9080882352941176) 6%, ${album.themeColor} 100%)`,
              }}
            >
              <div className="header">
                <div className="left">
                  <img src={album.coverImg} alt="" />
                </div>
                <div className="right">
                  <span className="type">Album</span>
                  <h1
                    className="albumTitle"
                    style={{
                      fontSize: album.title?.length > 10 ? '50px' : '90px',
                    }}
                  >
                    {album.title}
                  </h1>
                  <div className="bottomInfo">
                    {/* 
                  
                    {userInfo?.profilePic !== '' ? (
                      <img src={userInfo?.profilePic} alt="" />
                    ) : (
                      <i className="icon fa-solid fa-user"></i>
                    )}

                   */}
                    {album?.authorKey[0]?.profileImg && (
                      <img src={album.authorKey[0].profileImg} alt="" />
                    )}
                    {album.authorKey[0]?.name && (
                      <Link
                        to={`/authors/key/${album.authorKey[0].key}`}
                        className="singer"
                      >
                        {album.authorKey[0].name}
                        {' •'}
                      </Link>
                    )}{' '}
                    <span className="date">
                      {album.releaseyear.slice(0, 4)}
                    </span>{' '}
                    •<span className="length">{album.length}</span>
                  </div>
                </div>
              </div>
              <div className="list">
                <div className="top">
                  <div className="left">
                    <i className="icon play fa-solid fa-circle-play fa-4x"></i>
                    <i className="icon shuffle fa-solid fa-shuffle fa-2x"></i>
                    {/* {favAlbums.includes(album._id) ? (
                      <i
                        className="fa-solid fa-circle-check fa-2x"
                        style={{ color: '#1ed760' }}
                        onClick={(e) => handleAlbumFavourited(e, album._id)}
                      ></i>
                    ) : (
                      <i
                        className="icon add fa-solid fa-circle-plus fa-2x"
                        onClick={(e) => handleAlbumFavourited(e, album._id)}
                      ></i>
                    )} */}
                    <i
                      className={
                        favAlbums.includes(album._id)
                          ? 'icon liked fa-solid fa-circle-check fa-2x'
                          : 'icon add fa-solid fa-circle-plus fa-2x'
                      }
                      onClick={(e) => handleAlbumFavourited(e, album._id)}
                    ></i>
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
                  {loading
                    ? 'Loading...'
                    : album.songs?.map((song, id) => (
                        <div key={id} className="song">
                          <div className="left">
                            <div className="number">{id + 1}</div>
                            <i
                              className="playIcon fa-solid fa-play"
                              onClick={() => playHandler(song)}
                            ></i>
                            <div className="info">
                              <div className="title">{song.title}</div>
                              <div className="singer">{song.author}</div>
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
                                    setLiked((prev) => !prev);
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
                  <div className="releaseDate">{album.releaseyear}</div>
                  <div className="copyright">{album.copyright}</div>
                </div>
              </div>
            </div>
            <div className="merch">
              <div className="head">
                <h1>Merch</h1>
              </div>
              <div className="items">
                <FeaturedItem
                  img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2FAustinHatFront.png%3Fv%3D1690769339%26width%3D828&w=828&q=75"
                  title="Hollywood's Bleeding"
                  desc="2019"
                  shown={false}
                />
                <FeaturedItem
                  img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2FDigi_6ee58f94-eb7f-44f1-a595-fb6b64bf1d13.png%3Fv%3D1689264907%26width%3D828&w=828&q=75"
                  title="beerbongs & bentleys"
                  desc="2018"
                  shown={false}
                />
                <FeaturedItem
                  img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2Fmilky.png%3Fv%3D1690470872%26width%3D828&w=828&q=75"
                  title="Stoney (Deluxe)"
                  desc="2016"
                  shown={false}
                />
                <FeaturedItem
                  img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Fproducts%2FPMgreentiedyefront.png%3Fv%3D1690487048%26width%3D828&w=828&q=75"
                  title="Twelve Carat Toothache"
                  desc="2022"
                  shown={false}
                />
              </div>
            </div>
            <div className="others">
              <div className="head">
                <h1>Továbbiak tőle: {album.authorKey[0]?.name}</h1>
                <span>Teljes diszkográfia</span>
              </div>
              <div className="albums">
                <FeaturedItem
                  img="https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02"
                  title="Hollywood's Bleeding"
                  desc="2019"
                />
                <FeaturedItem
                  img="https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268"
                  title="beerbongs & bentleys"
                  desc="2018"
                />
                <FeaturedItem
                  img="https://i.scdn.co/image/ab67616d0000b27355404f712deb84d0650a4b41"
                  title="Stoney (Deluxe)"
                  desc="2016"
                />
                <FeaturedItem
                  img="https://upload.wikimedia.org/wikipedia/en/0/03/Post_Malone_-_Twelve_Carat_Toothache.png"
                  title="Twelve Carat Toothache"
                  desc="2022"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Album;
