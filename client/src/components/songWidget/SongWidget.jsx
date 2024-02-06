import axios from 'axios';
import './songWidget.scss';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

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

const SongWidget = () => {
  const [{ loading, error, songs }, dispatch] = useReducer(reducer, {
    songs: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_SONGS_START' });
      try {
        const result = await axios.get('http://localhost:3000/api/songs');
        dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: result.data });
        console.log();
      } catch (err) {
        dispatch({ type: 'FETCH_SONGS_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    'Loading...'
  ) : (
    <div className="songwidget">
      <div className="head">
        <h1 className="widgetTitle">Songs</h1>
        <Link to="/addsong">Add Song</Link>
      </div>
      <div className="list">
        <div className="listhead">
          <div className="left">
            <span className="hashtag">#</span>
            <span>Cím</span>
          </div>
          <div className="right">
            <div className="span">Előadó</div>
            <div className="extras">Kezelés</div>
          </div>
        </div>
        <div className="bottom">
          {loading
            ? 'Loading...'
            : songs?.map((song, id) => (
                <div key={id} className="song">
                  <div className="left">
                    <div className="number">{id + 1}</div>
                    <i className="playIcon fa-solid fa-play"></i>
                    <div className="info">
                      <div className="title">{song.title}</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="singer">{song.author}</div>
                    <div className="end">
                      <div className="length">{song.length}</div>
                      <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SongWidget;
