import './login.scss';
import Navbar from '../../components/navBar/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../Player';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(PlayerContext);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email,
          password,
        }
      );
      dispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="login">
      <Navbar />
      <div className="header">
        <div className="left"></div>
        <div className="right">
          <h1 className="title">Login</h1>
        </div>
      </div>
      <div className="info">
        <form action="" onSubmit={submitHandler}>
          <div className="top">
            <div className="left">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="right">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="bottom">
            <button type="submit" className="submitBtn">
              Login
            </button>
            <Link className="submitBtn" to={`/register?redirect=${redirect}`}>
              New to Spotify? Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
