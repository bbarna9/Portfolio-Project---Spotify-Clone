import { useContext, useState, useRef } from 'react';
import './bottomBar.scss';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../../Player';

const BottomBar = () => {
  const play = false;
  const volume = 20;
  let volumePower;
  if (volume > 0 && volume < 33) {
    volumePower = 'icon fa-solid fa-volume-off';
  } else if (volume >= 33 && volume < 66) {
    volumePower = 'icon fa-solid fa-volume-low';
  } else if (volume >= 66) {
    volumePower = 'icon fa-solid fa-volume-high';
  } else {
    volumePower = 'icon fa-solid fa-volume-xmark';
  }

  const { isOpen, dispatch } = useContext(PlayerContext);
  const [visible, setVisible] = useState(isOpen);

  const sidebarHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SIDEBAR_TOGGLE' });
      setVisible(!visible);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={isOpen ? 'bottombar opened' : 'bottombar closed'}>
      <div className="left">
        <Link to="/album">
          <img
            src="https://m.media-amazon.com/images/I/91rgNXHkQCL._UF1000,1000_QL80_.jpg"
            alt="album"
          />
        </Link>
        <div className="info">
          <Link to="/album" className="title">
            Novacandy
          </Link>
          <Link to="/author" className="singer">
            Post Malone
          </Link>
        </div>
      </div>
      <div className="center">
        <div className="top">
          <i className="icon shuffle fa-solid fa-shuffle fa-lg"></i>
          <i className="icon goBack fa-solid fa-backward-step fa-lg"></i>
          {/* ----- PLAY / PAUSE BUTTON ----- */}
          {play ? (
            <i className="icon pause fa-solid fa-circle-pause fa-2xl"></i>
          ) : (
            <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
          )}

          <i className="icon goForward fa-solid fa-forward-step fa-lg"></i>
          <i className="icon repeat fa-solid fa-repeat fa-lg"></i>
        </div>
        <div className="bottom">
          <span className="length">1:26</span>
          <div className="progressContainer">
            <div className="progressBar">
              <div className="progress"></div>
            </div>
            <div className="progressBall"></div>
          </div>
          <span className="length">4:56</span>
        </div>
      </div>
      <div className="right">
        <i
          className="sideOpen fa-regular fa-square-caret-right"
          onClick={sidebarHandler}
        ></i>
        <i className="icon fa-solid fa-microphone"></i>
        <i className="icon fa-solid fa-bars"></i>
        <i className="icon fa-solid fa-computer"></i>
        <div className="volume">
          <i className={volumePower}></i>
          <div className="volumeBar">
            <div className="volumeProgress"></div>
          </div>
          <div className="volumeBall"></div>
        </div>
        <i className="icon fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
    </div>
  );
};

export default BottomBar;
