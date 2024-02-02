import './addSong.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_SONG_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SONG_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_SONG_FAILURE':
      return { ...state, loadingCreate: false };
  }
};

const AddSong = () => {
  const [song, setSong] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorKey, setAuthorKey] = useState(null);
  const [albumKey, setAlbumKey] = useState(null);
  const [length, setLength] = useState(null);
  const [listens, setListens] = useState(null);
  const [genre, setGenre] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [link, setLink] = useState(null);

  const navigate = useNavigate();

  const [{ loadingCreate }, dispatch] = useReducer(reducer, {});

  const handleChange = (e) => {
    const value = e.target.value;
    setSong({ ...song, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_SONG_REQUEST' });
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/songs',
        song
      );
      dispatch({ type: 'CREATE_SONG_SUCCESS' });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'CREATE_SONG_FAILURE' });
      navigate('/');
    }
  };

  return (
    <div className="addsong">
      <Navbar />
      <div className="header">
        <div className="left">
          <img
            src="https://pbs.twimg.com/media/FxpRR74XoAElTfH?format=jpg&name=small"
            alt=""
          />
        </div>
        <div className="right">
          <h1 className="title">Add Song</h1>
        </div>
      </div>
      <div className="albumInfo">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
              <label>Album Key</label>
              <input
                type="text"
                placeholder="Album Key"
                name="albumKey"
                onChange={handleChange}
              />
              <label>Cover Image</label>
              <input
                type="text"
                placeholder="Cover Image"
                name="coverImg"
                onChange={handleChange}
              />
            </div>
            <div className="center">
              <label>Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                onChange={handleChange}
              />
              <label>Length</label>
              <input
                type="text"
                placeholder="Length"
                name="length"
                onChange={handleChange}
              />
              <label>Genre</label>
              <input
                type="text"
                placeholder="Genre"
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="right">
              <label>Author Key</label>
              <input
                type="text"
                placeholder="Author Key"
                name="authorKey"
                onChange={handleChange}
              />
              <label>Listens</label>
              <input
                type="text"
                placeholder="Listens"
                name="listens"
                onChange={handleChange}
              />
              <label>Audio Link</label>
              <input
                type="text"
                placeholder="Audio Link"
                name="link"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bottom">
            <button className="submitBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
