import './addSong.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import storage from '../../firebase.js';

const AddSong = () => {
  const [song, setSong] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [link, setLink] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSong({ ...song, [e.target.name]: value });
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
            setSong((prev) => {
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
      { file: link, label: 'link' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/songs',
        song,
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
              <label>Audio File</label>
              <input
                type="file"
                placeholder="Audio File"
                name="link"
                id="link"
                onChange={(e) => setLink(e.target.files[0])}
              />
              <label htmlFor="link" className="fileLabel">
                <i className="icon fa-solid fa-arrow-up-from-bracket fa-2x"></i>
              </label>
            </div>
          </div>
          <div className="bottom">
            {uploaded === 2 ? (
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

export default AddSong;
