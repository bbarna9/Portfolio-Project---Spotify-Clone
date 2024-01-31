import FeaturedItem from '../featuredItem/FeaturedItem';
import './featuredList.scss';

const FeaturedList = () => {
  return (
    <div className="featuredList">
      <div className="top">
        <div className="listHeader">
          <h3 className="listTitle">Népszerű</h3>
          <span>Összes</span>
        </div>
      </div>
      <div className="bottom">
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
        />
        <FeaturedItem
          img="https://seed-mix-image.spotifycdn.com/v6/img/artist/50co4Is1HCEo8bhOyUWKpn/en/default"
          title="Chill mix"
          desc="Young Thug, A$AP Rocky, Lana Del Rey és még sokan mások"
        />
      </div>
    </div>
  );
};

export default FeaturedList;
