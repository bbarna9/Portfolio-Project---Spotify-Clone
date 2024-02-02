import Scrollbars from 'react-custom-scrollbars';
import './rightSideBar.scss';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../Player';

const RightSideBar = () => {
  const { isOpen, dispatch } = useContext(PlayerContext);

  const closeHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SIDEBAR_CLOSE' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={isOpen ? 'rightsidebar' : 'rightsidebar closed'}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={300}
        style={{ height: '100%', width: '100%' }}
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
      >
        <div className="onPlay">
          <div className="song">
            <div className="header">
              <h3 className="albumTitle">AUSTIN</h3>
              <i className="close fa-solid fa-xmark" onClick={closeHandler}></i>
            </div>
            <img
              src="https://m.media-amazon.com/images/I/91rgNXHkQCL._UF1000,1000_QL80_.jpg"
              alt=""
            />
            <div className="bottom">
              <div className="left">
                <h1 className="songTitle">Novacandy</h1>
                <Link to="/author" className="infoSinger">
                  Post Malone
                </Link>
              </div>
              <div className="right">
                <i className="icon fa-solid fa-ellipsis"></i>
              </div>
            </div>
          </div>
          <div className="singer">
            <div className="top">
              <span>Az előadóról</span>
              <img
                src="https://i.pinimg.com/originals/2e/e8/61/2ee861918e197006cc5b9d948b6a645b.jpg"
                alt=""
              />
            </div>
            <div className="bottom">
              <Link to="/author" className="name">
                Post Malone
              </Link>
              <div className="stats">
                <span>59 807 389 hallgató havonta</span>
                <button className="followButton">Követés</button>
              </div>
              <p className="desc">
                Diamond-certified American hitmaker Post Malone bridges the gap
                between the worlds of rap and the pop...
              </p>
            </div>
          </div>
          <div className="authors">
            <div className="head">
              <h3 className="title">Alkotók</h3>
              <span>Összes</span>
            </div>
            <div className="list">
              <div className="author">
                <Link to="/author" className="name">
                  Post Malone
                </Link>
                <div className="authorTitle">Fő előadó, Producer</div>
              </div>
              <div className="author">
                <div className="name">Andrew Watt</div>
                <div className="authorTitle">Zeneszerző, Producer</div>
              </div>
              <div className="author">
                <div className="name">Loius Bell</div>
                <div className="authorTitle">Zeneszerző, Producer</div>
              </div>
            </div>
          </div>
          <div className="tour">
            <div className="head">
              <h3 className="title">Turnén</h3>
              <span>Összes</span>
            </div>
            <div className="tourDates">
              <div className="tourDate">
                <div className="left">
                  <span className="month">Febr.</span>
                  <span className="day">3</span>
                </div>
                <div className="right">
                  <div className="info">
                    <div className="location">Scottscdale</div>
                    <div className="name">Post Malone</div>
                    <div className="time">Szo 14:30 • TPC Scottscdale</div>
                  </div>
                </div>
              </div>
              <div className="tourDate">
                <div className="left">
                  <span className="month">Febr.</span>
                  <span className="day">3</span>
                </div>
                <div className="right">
                  <div className="info">
                    <div className="location">Scottscdale</div>
                    <div className="name">Post Malone</div>
                    <div className="time">Szo 14:30 • TPC Scottscdale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="merch">
            {/* -------------- MEGCSINÁLNI --------------- */}
          </div>
          <div className="currently">
            <div className="head">
              <h3 className="title">Műsoron</h3>
              <span>Műsor megnyitása</span>
            </div>
            <div className="nextSong">
              <i className="songIcon fa-solid fa-music"></i>
              <i className="playIcon fa-solid fa-play"></i>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="songInfo">
                <span className="title">7 min freestyle</span>
                <span className="singer">21 Savage</span>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default RightSideBar;
