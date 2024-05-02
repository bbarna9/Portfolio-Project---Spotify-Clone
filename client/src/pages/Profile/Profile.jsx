import './profile.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PlayerContext } from '../../context/Player';

const Profile = () => {
  const subscribed = true;
  const { state, ctxDispatch } = useContext(PlayerContext);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
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
          <div className="top">
            <span style={{ paddingLeft: '15px' }}>Profil</span>
            <span
              onClick={(e) => handleLogout(e)}
              style={{ cursor: 'pointer', fontWeight: '500' }}
            >
              Kijelentkezés
            </span>
          </div>
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
              <label>Manage</label>
              <Link to="/admin">Manage content</Link>
            </div>
          </div>
          <div className="bottom"></div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
