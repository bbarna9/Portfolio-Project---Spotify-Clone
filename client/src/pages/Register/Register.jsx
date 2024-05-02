import './register.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register">
      <Navbar />
      <div className="header">
        <div className="left">
          <i className="icon fa-regular fa-image fa-3x"></i>
          {/* <img src="" alt="" /> */}
        </div>
        <div className="right">
          <h1 className="title">Register</h1>
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
      <div className="info">
        <form action="">
          <div className="top">
            <div className="left">
              <label>Email</label>
              <input type="email" placeholder="Email" name="email" />
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="right">
              <label>Full Name</label>
              <input type="text" placeholder="Your Full Name" name="text" />
              <label>Confirm Password</label>
              <input type="password" placeholder="Password" name="password" />
            </div>
          </div>
          <div className="bottom">
            <button className="submitBtn">Register</button>
            <button className="submitBtn">
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to="/login"
              >
                Already have an account? Login here.
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
