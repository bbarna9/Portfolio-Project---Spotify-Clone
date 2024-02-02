import './addAlbum.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';

const AddAlbum = () => {
  const subscribed = true;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
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
          <form action="">
            <label>Songs</label>
            <select
              className={subscribed ? 'subscribed' : ''}
              onClick={(e) => handleClick}
            >
              <option value="Subscribed">Subscribe</option>
              <option value="Unsubscribed">Unsubscribe</option>
            </select>
          </form>
        </div>
      </div>
      <div className="albumInfo">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Title</label>
              <input type="text" placeholder="Title" />
              <label>Key</label>
              <input type="text" placeholder="Key" />
              <label>Release Year</label>
              <input type="text" placeholder="Release Year" />
            </div>
            <div className="center">
              <label>Length</label>
              <input type="text" placeholder="Length" />
              <label>Theme</label>
              <input type="text" placeholder="Theme Color" />
              <label>Genre</label>
              <input type="text" placeholder="Genre" />
            </div>
            <div className="right">
              <label>Author Key</label>
              <input type="text" placeholder="Author Key" />
              <label>Copyright</label>
              <input type="text" placeholder="Copyright" />
              <label>Cover Image</label>
              <input type="text" placeholder="Cover Image" />
            </div>
          </div>
          <div className="bottom">
            <button className="submitBtn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
