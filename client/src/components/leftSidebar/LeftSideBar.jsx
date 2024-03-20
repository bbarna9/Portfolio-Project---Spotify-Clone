import Scrollbars from 'react-custom-scrollbars';
import './leftSideBar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LeftSideBar = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={open ? 'leftsidebar' : 'leftsidebar closed'}>
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
        <div className="top">
          <div className="topTop">
            <Link to="/">
              <i className="fa-solid fa-house fa-lg"></i>
              <span>Kezdőlap</span>
            </Link>
          </div>
          <div className="topBottom">
            <a href="#">
              <i className="fa-solid fa-magnifying-glass fa-lg"></i>
              <span>Keresés</span>
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="first">
            <div className="left">
              <i
                className={
                  open
                    ? 'icon fa-solid fa-folder-open fa-lg'
                    : 'icon fa-solid fa-folder fa-lg'
                }
                onClick={handleClose}
              ></i>
              <span>Gyűjteményem</span>
            </div>
            <div className="right">
              <i className="icon fa-solid fa-plus"></i>
              <i className="icon fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="second">
            <button className="filterButton">Műsorlisták</button>
            <button className="filterButton">Podcastok és műsorok</button>
            <button className="filterButton">Albumok</button>
            <button className="filterButton">Előadók</button>
            <button className="filterButton">Letöltött</button>
          </div>
          <div className="third">
            <i className="icon fa-solid fa-magnifying-glass"></i>
            <div className="sortingButton">
              <span>Legutóbbiak</span>
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
          <div className="collection">
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
            <Link to="album" className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="info">
                <h2 className="infoTitle">Kedvelt dalok</h2>
                <span>Műsorlista • 115 dal</span>
              </div>
            </Link>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default LeftSideBar;
