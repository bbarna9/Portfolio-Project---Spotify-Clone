import axios from 'axios';
import './authorWidget.scss';
import { useEffect, useReducer } from 'react';

/* const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_AUTHORS_START':
      return { ...state, loading: true };
    case 'FETCH_AUTHORS_SUCCESS':
      return { ...state, authors: action.payload, loading: false };
    case 'FETCH_AUTHORS_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
}; */

const AuthorWidget = () => {
  /* const [{ loading, error, authors }, dispatch] = useReducer(reducer, {
    authors: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_AUTHORS_START' });
      try {
        const result = await axios.get('http://localhost:3000/api/authors');
        dispatch({ type: 'FETCH_AUTHORS_SUCCESS', payload: result.data });
        console.log();
      } catch (err) {
        dispatch({ type: 'FETCH_AUTHORS_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []); */

  //return loading ? 'Loading...' : <div>AuthorWidget</div>;
  return <div>AuthorWidget</div>;

  /* <div className="albumwidget">
      <h1 className="widgetTitle">Authors</h1>
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
            : authors?.map((author, id) => (
                <div key={id} className="album">
                  <div className="left">
                    <div className="number">{id + 1}</div>
                    <i className="playIcon fa-solid fa-play"></i>
                    <div className="info">
                      <div className="title">{author.title}</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="singer">{author.author}</div>
                    <div className="end">
                      <div className="length">{author.length}</div>
                      <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div> */
};

export default AuthorWidget;
