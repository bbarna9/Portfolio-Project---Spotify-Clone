import './addAuthor.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';

const AddAuthor = () => {
  const subscribed = true;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
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
              <select
                className={subscribed ? 'subscribed' : ''}
                onClick={(e) => handleClick}
              >
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
              </select>
            </div>
            <div className="right">
              <label>Albums</label>
              <select
                className={subscribed ? 'subscribed' : ''}
                onClick={(e) => handleClick}
              >
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
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
              <input type="text" placeholder="Name" />
              <label>Profile Image</label>
              <input type="text" placeholder="Profile Image" />
              <label>Listeners</label>
              <input type="text" placeholder="Listeners" />
            </div>
            <div className="center">
              <label>Merch</label>
              <select
                className={subscribed ? 'subscribed' : ''}
                onClick={(e) => handleClick}
              >
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
              </select>
              <label>Cover Image</label>
              <input type="text" placeholder="Cover Image" />
              <label>Genre</label>
              <input type="text" placeholder="Genre" />
            </div>
            <div className="right">
              <label>Tour Dates</label>
              <select
                className={subscribed ? 'subscribed' : ''}
                onClick={(e) => handleClick}
              >
                <option value="Subscribed">Subscribe</option>
                <option value="Unsubscribed">Unsubscribe</option>
              </select>
              <label>Description Image</label>
              <input type="text" placeholder="Description Image" />
              <label>Key</label>
              <input type="text" placeholder="Key" />
            </div>
          </div>
          <div className="bottom">
            <div className="descContainer">
              <textarea type="text" placeholder="Description" />
              <button className="submitBtn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
