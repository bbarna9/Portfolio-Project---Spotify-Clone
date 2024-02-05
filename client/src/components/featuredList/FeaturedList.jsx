import { useContext, useEffect, useReducer } from 'react';
import FeaturedItem from '../featuredItem/FeaturedItem';
import './featuredList.scss';
import axios from 'axios';
import { PlayerContext } from '../../Player';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_LISTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LISTS_SUCCESS':
      return { ...state, loading: false, lists: action.payload };
    case 'FETCH_LISTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const FeaturedList = () => {
  const { state } = useContext(PlayerContext);
  const { isOpen } = state;

  const maxSize = isOpen ? 4 : 5;

  const [{ loading, error, lists }, dispatch] = useReducer(reducer, {
    lists: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_LISTS_REQUEST' });
      try {
        // ÁTÍRNI AZ ALBUMOKAT LISTÁKRA
        const result = await axios.get('http://localhost:3000/api/albums');
        dispatch({ type: 'FETCH_LISTS_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_LISTS_FAILURE', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featuredList">
      <div className="top">
        <div className="listHeader">
          <h3 className="listTitle">Népszerű</h3>
          <span>Összes</span>
        </div>
      </div>
      <div className="bottom">
        {loading
          ? 'Loading...'
          : lists
              .slice(0, maxSize)
              .map((album, i) => (
                <FeaturedItem
                  key={i}
                  img={album.coverImg}
                  _id={album._id}
                  title={album.title}
                  desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
                />
              ))}
        {/* <FeaturedItem
          img="https://seed-mix-image.spotifycdn.com/v6/img/artist/50co4Is1HCEo8bhOyUWKpn/en/default"
          title="Chill mix"
          desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
        />
        <FeaturedItem
          img="https://seed-mix-image.spotifycdn.com/v6/img/artist/50co4Is1HCEo8bhOyUWKpn/en/default"
          title="Chill mix"
          desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
        />
        <FeaturedItem
          img="https://seed-mix-image.spotifycdn.com/v6/img/artist/50co4Is1HCEo8bhOyUWKpn/en/default"
          title="Chill mix"
          desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
        />
        <FeaturedItem
          img="https://seed-mix-image.spotifycdn.com/v6/img/artist/50co4Is1HCEo8bhOyUWKpn/en/default"
          title="Chill mix"
          desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
        /> */}
      </div>
    </div>
  );
};

export default FeaturedList;
