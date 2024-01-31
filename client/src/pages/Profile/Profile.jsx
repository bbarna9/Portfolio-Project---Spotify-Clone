import './profile.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';

const Profile = () => {
  const subscribed = true;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="header">
        <div className="left">
          <img
            src="https://pbs.twimg.com/media/FxpRR74XoAElTfH?format=jpg&name=small"
            alt=""
          />
        </div>
        <div className="right">
          <span className="type">Profil</span>
          <h1 className="albumTitle">Admin</h1>
          <div className="bottomInfo">
            <span>4 nyilvános műsorlista </span> •
            <span className="date"> 3 követő </span> •
            <span className="length"> 8 követés</span>
          </div>
        </div>
      </div>
      <div className="userInfo">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Full Name</label>
              <input type="text" placeholder="Name" />
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className="right">
              <label>Username</label>
              <input type="text" placeholder="Username" />
              <label>Subscription</label>
              <button
                className={subscribed ? 'subscribed' : ''}
                onClick={(e) => handleClick}
                disabled={subscribed ? true : false}
              >
                {subscribed ? 'Subscribed' : 'Manage subscription'}
              </button>
            </div>
          </div>
          <div className="bottom"></div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
