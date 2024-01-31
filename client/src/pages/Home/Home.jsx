import { Link } from 'react-router-dom';
import FeaturedList from '../../components/featuredList/FeaturedList';
import Navbar from '../../components/navBar/Navbar';
import './home.scss';
import { Scrollbars } from 'react-custom-scrollbars';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
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
        <div className="homeHeader">
          <h1 className="greeting">Jó napot</h1>
          <div className="suggestions">
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
            <Link to="/album" className="suggestion">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/12/21_Savage_-_Issa_Album.png"
                alt=""
              />
              <div className="suggestionName">Issa Album</div>
              <div className="iconContainer">
                <i className="icon play fa-solid fa-circle-play fa-2xl"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="featuredContainer">
          <FeaturedList />
          <FeaturedList />
          <FeaturedList />
          <FeaturedList />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Home;
