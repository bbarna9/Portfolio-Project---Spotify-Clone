import React, { Children } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import './scrollbar.scss';
import { Outlet } from 'react-router-dom';

const Scrollbar = ({ children }) => {
  return (
    <div className="scrollbar">
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
      ></Scrollbars>
    </div>
  );
};

export default Scrollbar;
