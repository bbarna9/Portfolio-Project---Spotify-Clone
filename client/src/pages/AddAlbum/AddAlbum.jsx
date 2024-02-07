import './addAlbum.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import storage from '../../firebase';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SONGS_SUCCESS':
      return { ...state, songs: action.payload, loading: false };
    case 'FETCH_SONGS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AddAlbum = () => {
  const [list, setList] = useState(null);
  const [album, setAlbum] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const [{ loading, error, songs }, dispatch] = useReducer(reducer, {
    songs: [],
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
    // console.log(songs[0].albumKey[0].title);
  }, []);

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
            setAlbum((prev) => {
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
    upload([{ file: coverImg, label: 'coverImg' }]);
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAlbum({ ...album, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/albums',
        album,
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
    <div className="addalbum">
      <Navbar />
      <div className="header">
        <div className="left">
          <img
            src="https://pbs.twimg.com/media/FxpRR74XoAElTfH?format=jpg&name=small"
            alt=""
          />
        </div>
        <div className="right">
          <h1 className="title">Add Album</h1>
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
              <label>Key</label>
              <input
                type="text"
                placeholder="Key"
                name="key"
                onChange={handleChange}
              />
              <label>Release Year</label>
              <input
                type="text"
                placeholder="Release Year"
                name="releaseyear"
                onChange={handleChange}
              />
            </div>
            <div className="center">
              <label>Length</label>
              <input
                type="text"
                placeholder="Length"
                name="length"
                onChange={handleChange}
              />
              <label>Theme</label>
              <input
                type="text"
                placeholder="Theme Color"
                name="themeColor"
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
              <label>Copyright</label>
              <input
                type="text"
                placeholder="Copyright"
                name="copyright"
                onChange={handleChange}
              />
              <label>Cover Image</label>
              <input
                type="file"
                placeholder="Cover Image"
                name="coverImg"
                id="coverImg"
                onChange={(e) => setCoverImg(e.target.files[0])}
              />
              <label className="fileLabel" htmlFor="coverImg">
                <i className="icon fa-solid fa-arrow-up-from-bracket fa-2x"></i>
              </label>
            </div>
          </div>
          <div className="bottom">
            <div className="selectContainer">
              <label>Songs</label>
              <select multiple name="songs" onChange={handleSelect}>
                {songs.map((song) => (
                  <option key={song._id} value={song._id}>
                    {song.author} - {song.title}
                  </option>
                ))}
              </select>
            </div>
            {uploaded === 1 ? (
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
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
