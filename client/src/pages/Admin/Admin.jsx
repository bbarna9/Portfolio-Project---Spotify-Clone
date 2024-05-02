import Navbar from '../../components/navBar/Navbar';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import './admin.scss';
import data from '../../albumData.json';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import SongWidget from '../../components/songWidget/SongWidget';
import AlbumWidget from '../../components/albumWidget/AlbumWidget';
import AuthorWidget from '../../components/authorWidget/AuthorWidget';

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

const Admin = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [{ loading, error, album }, dispatch] = useReducer(reducer, {
    album: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUM_START' });
      try {
        const result = await axios.get('http://localhost:3000/api/albums');
        dispatch({ type: 'FETCH_ALBUM_SUCCESS', payload: result.data[0] });
      } catch (err) {
        dispatch({ type: 'FETCH_ALBUM_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []);

  const handleScroll = (event) => {
    setIsScrolled(event.currentTarget.scrollTop === 0 ? false : true);
  };

  return (
    <div className="admin">
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="container" onScroll={handleScroll}>
            <div className="mainContainer">
              <div className="header">
                <h1 className="albumTitle">Manage Media</h1>
              </div>
            </div>
            <div className="songs">
              <SongWidget />
            </div>
            <div className="albums">
              <AlbumWidget />
            </div>
            <div className="authors">
              <AuthorWidget />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
