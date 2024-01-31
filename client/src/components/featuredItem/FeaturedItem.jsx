import { Link } from 'react-router-dom';
import './featuredItem.scss';
import PropTypes from 'prop-types';

const FeaturedItem = (props) => {
  const show = props.shown === false ? false : true;
  // const show = props.shown;
  console.log(show);

  return (
    <Link to="/album" className="featuredItem">
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
  title: PropTypes.string,
  desc: PropTypes.string,
  shown: PropTypes.bool,
};

export default FeaturedItem;