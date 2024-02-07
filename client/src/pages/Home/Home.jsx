import { Link } from 'react-router-dom';
import FeaturedList from '../../components/featuredList/FeaturedList';
import Navbar from '../../components/navBar/Navbar';
import './home.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { PlayerContext } from '../../context/Player';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SONGS_SUCCESS':
      return { ...state, songs: action.payload, loading: false };
    case 'FETCH_SONGS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_ALBUMS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_ALBUMS_SUCCESS':
      return { ...state, albums: action.payload, loading: false };
    case 'FETCH_ALBUMS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(PlayerContext);
  const { isOpen } = state;

  const [{ loading, error, albums }, dispatch] = useReducer(reducer, {
    songs: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUMS_REQUEST' });
      try {
        const result = await axios.get('http://localhost:3000/api/albums');
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: result.data });
        console.log(albums);
      } catch (error) {
        dispatch({ type: 'FETCH_ALBUMS_FAIL', payload: error.message });
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Navbar />
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
            <div className="homeHeader">
              <h1 className="greeting">Jó napot</h1>
              <div className={isOpen ? 'suggestions' : 'suggestions closed'}>
                {albums?.map((album, i) => {
                  return (
                    <Link
                      key={i}
                      to={`/albums/key/${album.key}`}
                      className="suggestion"
                    >
                      <img src={album.coverImg} alt="" />
                      <div className="suggestionName">{album.title}</div>
                      <div className="iconContainer">
                        <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="featuredContainer">
              <FeaturedList />
              <FeaturedList />
              <FeaturedList />
              <FeaturedList />
            </div>
          </Scrollbars>
        </>
      )}
    </div>
  );
};

export default Home;
