import './addAuthor.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import storage from '../../firebase';
import { useEffect, useReducer, useState } from 'react';

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

const AddAuthor = () => {
  const [author, setAuthor] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [descImg, setDescImg] = useState(null);
  const [list, setList] = useState(null);
  const [merch, setMerch] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const [{ loading, error, songs, albums }, dispatch] = useReducer(reducer, {
    songs: [],
    albums: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_SONGS_REQUEST' });
      try {
        const result = await axios.get('http://localhost:3000/api/songs');
        dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_SONGS_FAIL', payload: error.message });
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ALBUMS_REQUEST' });
      try {
        const result = await axios.get('http://localhost:3000/api/albums');
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ALBUMS_FAIL', payload: error.message });
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setAuthor({ ...author, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + ' % done.');
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setAuthor((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
            console.log('Befejeződött a feltöltés');
            setUploading(false);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    console.log('Megkezdődik a feltöltés');
    setUploading(true);
    e.preventDefault();
    upload([
      { file: coverImg, label: 'coverImg' },
      { file: descImg, label: 'descImg' },
      { file: profileImg, label: 'profileImg' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/authors',
        author,
        {
          headers: {
            token:
              'Bearer: ' +
              JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  return loading ? (
    'Loading...'
  ) : (
    <div className="addauthor">
      <Navbar />
      <div className="header">
        <div className="left">
          <img
            src="https://pbs.twimg.com/media/FxpRR74XoAElTfH?format=jpg&name=small"
            alt=""
          />
        </div>
        <div className="right">
          <h1 className="title">Add Author</h1>
          <form action="">
            <div className="left">
              <label>Songs</label>
              <select multiple name="songs" onChange={handleSelect}>
                {songs.map((song) => (
                  <option key={song._id} value={song._id}>
                    {song.author} - {song.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="right">
              <label>Albums</label>
              <select multiple name="albums" onChange={handleSelect}>
                {albums.map((album) => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="albumInfo">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              <label>Profile Image</label>
              <input
                type="file"
                placeholder="Profile Image"
                name="profileImg"
                id="profileImg"
                onChange={(e) => setProfileImg(e.target.files[0])}
              />
              <label>Listeners</label>
              <input
                type="text"
                placeholder="Listeners"
                name="listeners"
                onChange={handleChange}
              />
            </div>
            <div className="center">
              {/* <label>Merch</label>
              <select onClick={handleSelect}>
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
              </select> */}
              <label>Cover Image</label>
              <input
                type="file"
                placeholder="Cover Image"
                name="coverImg"
                id="coverImg"
                onChange={(e) => setCoverImg(e.target.files[0])}
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
              {/* <label>Tour Dates</label>
              <select onClick={() => console.log('tour')}>
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
              </select> */}
              <label>Description Image</label>
              <input
                type="file"
                placeholder="Description Image"
                name="descImg"
                id="descImg"
                onChange={(e) => setDescImg(e.target.files[0])}
              />
              <label>Key</label>
              <input
                type="text"
                placeholder="Key"
                name="key"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bottom">
            <div className="descContainer">
              <textarea
                type="text"
                placeholder="Description"
                name="desc"
                onChange={handleChange}
              />
              {uploaded === 3 ? (
                <button className="submitBtn" onClick={handleSubmit}>
                  Create
                </button>
              ) : (
                <button
                  className="submitBtn"
                  onClick={handleUpload}
                  disabled={uploading ? true : false}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
