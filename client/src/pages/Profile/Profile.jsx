import './profile.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PlayerContext } from '../../Player';

const Profile = () => {
  const subscribed = true;
  const { state } = useContext(PlayerContext);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="header">
        <div className="left">
          {userInfo.profilePic !== '' ? (
            <img src={userInfo.profilePic} alt="" />
          ) : (
            <i className="icon fa-regular fa-image fa-3x"></i>
          )}
        </div>
        <div className="right">
          <span>Profil</span>
          <h1 className="title">{userInfo.name}</h1>
          <form action="">
            <label className="picLabel">Profile Picture</label>
            <input
              type="file"
              placeholder="Profile Picture"
              name="profilePic"
              id="profilePic"
            />
            <label htmlFor="profilePic">
              <i className="icon fa-solid fa-arrow-up-from-bracket fa-2x"></i>
            </label>
          </form>
        </div>
      </div>
      <div className="userInfo">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Full Name</label>
              <input type="text" placeholder="Name" value={name} />
              <label>Email</label>
              <input type="email" placeholder="Email" value={email} />
            </div>
            <div className="right">
              <label>Username</label>
              <input type="text" placeholder="Username" value={username} />
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
