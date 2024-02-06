import Scrollbars from 'react-custom-scrollbars';
import Navbar from '../../components/navBar/Navbar';
import './playlist.scss';

const Playlist = () => {
  return (
    <div className="playlist">
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
        awrzt ni7oaezr fiaeur a
      </Scrollbars>
    </div>
  );
};

export default Playlist;
