import { Link } from 'react-router-dom';
import './featuredItem.scss';
import PropTypes from 'prop-types';
import { PlayerContext } from '../../Player';
import { useContext } from 'react';

const FeaturedItem = (props) => {
  const { state } = useContext(PlayerContext);
  const { isOpen } = state;

  const show = props.shown === false ? false : true;
  // const show = props.shown;

  return (
    <Link
      to={`/albums/${props._id}`}
      className={isOpen ? 'featuredItem' : 'featuredItem closed'}
    >
      <div className="top">
        <img src={props.img} alt="" />
        {show === true ? (
          <div className="iconContainer">
            <i className="icon play fa-solid fa-circle-play fa-3x"></i>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="info">
        <p className="title">{props.title}</p>
        <p className="singers">{props.desc}</p>
      </div>
    </Link>
  );
};

FeaturedItem.propTypes = {
  img: PropTypes.string,
  _id: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  shown: PropTypes.bool,
};

export default FeaturedItem;
