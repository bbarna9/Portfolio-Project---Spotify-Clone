import Navbar from '../../components/navBar/Navbar';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import './author.scss';
import data from '../../albumData.json';
import popularData from '../../popularData.json';

const Author = () => {
  return (
    <div className="author">
      <Navbar />
      <div className="container">
        <div className="mainContainer">
          <div className="header">
            <div className="right">
              <span className="type">
                <i className="iconBackground fa-solid fa-certificate fa-xl"></i>
                <i className="checkIcon fa-solid fa-check"></i>
                <span>Ellenőrzött előadó</span>
              </span>
              <h1 className="albumTitle">Post Malone</h1>
              <div className="bottomInfo">59 807 739 hallgató havonta</div>
            </div>
          </div>
          <div className="list">
            <div className="top">
              <div className="left">
                <i className="icon play fa-solid fa-circle-play fa-4x"></i>
                <i className="icon shuffle fa-solid fa-shuffle fa-2x"></i>
                <button className="followButton">Követés</button>
                <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
              </div>
            </div>
            <div className="head">
              <h1>Népszerű</h1>
            </div>
            <div className="bottom">
              {popularData.map((song, id) => (
                <div key={id} className="song">
                  <div className="left">
                    <div className="number">{id + 1}</div>
                    <i className="playIcon fa-solid fa-play"></i>
                    <div className="info">
                      <img src={song.cover} alt="" className="albumCover" />
                      <div className="title">{song.title}</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="plays">{song.plays}</div>
                    <div className="end">
                      <div className="length">{song.length}</div>
                      <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="footer">
              <span>Továbbiak</span>
            </div>
          </div>
        </div>
        <div className="others">
          <div className="head">
            <h1>Továbbiak tőle: Post Malone</h1>
            <span>Teljes diszkográfia</span>
          </div>
          <div className="albums">
            <FeaturedItem
              img="https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02"
              title="Hollywood's Bleeding"
              desc="2019"
            />
            <FeaturedItem
              img="https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268"
              title="beerbongs & bentleys"
              desc="2018"
            />
            <FeaturedItem
              img="https://i.scdn.co/image/ab67616d0000b27355404f712deb84d0650a4b41"
              title="Stoney (Deluxe)"
              desc="2016"
            />
            <FeaturedItem
              img="https://upload.wikimedia.org/wikipedia/en/0/03/Post_Malone_-_Twelve_Carat_Toothache.png"
              title="Twelve Carat Toothache"
              desc="2022"
            />
          </div>
        </div>
        <div className="merch">
          <div className="head">
            <h1>Merch</h1>
          </div>
          <div className="items">
            <FeaturedItem
              img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2FAustinHatFront.png%3Fv%3D1690769339%26width%3D828&w=828&q=75"
              title="Hollywood's Bleeding"
              desc="2019"
              shown={false}
            />
            <FeaturedItem
              img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2FDigi_6ee58f94-eb7f-44f1-a595-fb6b64bf1d13.png%3Fv%3D1689264907%26width%3D828&w=828&q=75"
              title="beerbongs & bentleys"
              desc="2018"
              shown={false}
            />
            <FeaturedItem
              img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Ffiles%2Fmilky.png%3Fv%3D1690470872%26width%3D828&w=828&q=75"
              title="Stoney (Deluxe)"
              desc="2016"
              shown={false}
            />
            <FeaturedItem
              img="https://shop.spotify.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0016%2F2565%2F3303%2Fproducts%2FPMgreentiedyefront.png%3Fv%3D1690487048%26width%3D828&w=828&q=75"
              title="Twelve Carat Toothache"
              desc="2022"
              shown={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
