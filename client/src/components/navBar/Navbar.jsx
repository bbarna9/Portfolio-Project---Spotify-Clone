import { useContext } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/Player';

const Navbar = () => {
  const { state } = useContext(PlayerContext);
  const { isOpen, userInfo, currentSong } = state;
  const current = 'se';
  const navigate = useNavigate();

  // A FELTÉTELT ÁTÍRNI CURRENTSONGRA
  return (
    <div className={current !== null && isOpen ? 'navbar' : 'navbar closed'}>
      <div className="left">
        <i
          className="icon fa-solid fa-chevron-left"
          onClick={() => navigate(-1)}
        ></i>
        <i
          className="icon fa-solid fa-chevron-right"
          onClick={() => navigate(1)}
        ></i>
      </div>
      <div className="right">
        <i className="icon fa-regular fa-bell"></i>
        <i className="icon fa-solid fa-users"></i>
        <Link to="/profile">
          {userInfo?.profilePic !== '' ? (
            <img src={userInfo?.profilePic} alt="" />
          ) : (
            <i className="icon fa-solid fa-user"></i>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
