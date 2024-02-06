import axios from 'axios';
import './albumWidget.scss';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS_START':
      return { ...state, loading: true };
    case 'FETCH_ALBUMS_SUCCESS':
      return { ...state, albums: action.payload, loading: false };
    case 'FETCH_ALBUMS_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const AlbumWidget = () => {
  const [{ loading, error, albums }, dispatch] = useReducer(reducer, {
    albums: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUMS_START' });
      try {
        const result = await axios.get('http://localhost:3000/api/albums');
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: result.data });
        console.log();
      } catch (err) {
        dispatch({ type: 'FETCH_ALBUMS_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    'Loading...'
  ) : (
    <div className="albumwidget">
      <div className="head">
        <h1 className="widgetTitle">Albums</h1>
        <Link to="/addalbum">Add Album</Link>
      </div>
      <div className="list">
        <div className="thead">
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
            : albums?.map((album, id) => (
                <div key={id} className="album">
                  <div className="left">
                    <div className="number">{id + 1}</div>
                    <i className="playIcon fa-solid fa-play"></i>
                    <div className="info">
                      <div className="title">{album.title}</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="singer">{album.author}</div>
                    <div className="end">
                      <div className="length">{album.length}</div>
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

export default AlbumWidget;
