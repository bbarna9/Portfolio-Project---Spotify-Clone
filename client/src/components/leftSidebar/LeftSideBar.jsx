import Scrollbars from 'react-custom-scrollbars';
import './leftSideBar.scss';
import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FAVS_START':
      return { ...state, loading: true };
    case 'FETCH_FAVS_SUCCESS':
      return { ...state, favs: action.payload, loading: false };
    case 'FETCH_FAVS_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const LeftSideBar = () => {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );
  console.log(user?.likedAuthors);
  const [fav, setFav] = useState(
    user?.likedSongs
      ? JSON.parse(localStorage.getItem('userInfo'))?.likedSongs
      : []
  );
  const [favAlbums, setFavAlbums] = useState([]);
  const [favAuthors, setFavAuthors] = useState([]);
  const [changed, setChanged] = useState(true);

  const [{ loading, error, favs }, dispatch] = useReducer(reducer, {
    favs: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_FAVS_START' });
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
          type: 'FETCH_FAVS_SUCCESS',
          payload: result.data[0],
        });
        setFavAlbums((prev) => [...result.data[0].albums]);
        setFavAuthors((prev) => [...result.data[0].authors]);
        console.log(result.data[0].authors);
        console.log(favAuthors);
      } catch (err) {
        dispatch({ type: 'FETCH_FAVS_FAILURE', payload: error.message });
        console.log(err);
      }
    };
    fetchData();
  }, [changed]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  window.addEventListener('storage', () => {
    setFav((prev) => JSON.parse(localStorage.getItem('userInfo'))?.likedSongs);
    setUser((prev) => JSON.parse(localStorage.getItem('userInfo')));
    setChanged((prev) => !prev);
  });

  return (
    <div className={open ? 'leftsidebar' : 'leftsidebar closed'}>
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
        <div className="top">
          <div className="topTop">
            <Link to="/">
              <i className="fa-solid fa-house fa-lg"></i>
              <span>Kezdőlap</span>
            </Link>
          </div>
          <div className="topBottom">
            <a href="#">
              <i className="fa-solid fa-magnifying-glass fa-lg"></i>
              <span>Keresés</span>
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="first">
            <div className="left">
              <i
                className={
                  open
                    ? 'icon fa-solid fa-folder-open fa-lg'
                    : 'icon fa-solid fa-folder fa-lg'
                }
                onClick={handleClose}
              ></i>
              <span>Gyűjteményem</span>
            </div>
            <div className="right">
              <i className="icon fa-solid fa-plus"></i>
              <i className="icon fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="second">
            <button className="filterButton">Műsorlisták</button>
            <button className="filterButton">Podcastok és műsorok</button>
            <button className="filterButton">Albumok</button>
            <button className="filterButton">Előadók</button>
            <button className="filterButton">Letöltött</button>
          </div>
          <div className="third">
            <i className="icon fa-solid fa-magnifying-glass"></i>
            <div className="sortingButton">
              <span>Legutóbbiak</span>
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
          <div className="collection">
            {user && (
              <>
                <Link to="favourites" className="item">
                  <img src="/public/likedsongs.png" alt="" />
                  <div className="info">
                    <h2 className="infoTitle">Kedvelt dalok</h2>
                    <span>Műsorlista • {fav.length} dal</span>
                  </div>
                </Link>
                {favs.albums?.map((album, i) => {
                  return (
                    <Link
                      to={`/albums/key/${album.key}`}
                      className="item"
                      key={i}
                    >
                      <img src={album?.coverImg} alt="" />
                      <div className="info">
                        <h2 className="infoTitle">{album?.title}</h2>
                        <span>Album • {album.length}</span>
                      </div>
                    </Link>
                  );
                })}
                {favs.authors?.map((author, i) => {
                  return (
                    <Link
                      to={`/authors/key/${author.key}`}
                      className="item"
                      key={i}
                    >
                      <img
                        src={author?.profileImg}
                        alt=""
                        style={{ borderRadius: '50%' }}
                      />
                      <div className="info">
                        <h2 className="infoTitle">{author?.name}</h2>
                        <span>Előadó</span>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default LeftSideBar;
