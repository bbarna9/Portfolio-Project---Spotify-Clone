import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
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
          <img
            src="https://pbs.twimg.com/media/FxpRR74XoAElTfH?format=jpg&name=small"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
