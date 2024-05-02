import Navbar from '../../components/navBar/Navbar';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import './author.scss';
import data from '../../albumData.json';
import popularData from '../../popularData.json';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_AUTHOR_START':
      return { ...state, loading: true };
    case 'FETCH_AUTHOR_SUCCESS':
      return { ...state, author: action.payload, loading: false };
    case 'FETCH_AUTHOR_FAILURE':
      return { ...state, loading: false, error: action.payload };
  }
};

const Author = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fav, setFav] = useState(false);

  const [{ loading, error, author }, dispatch] = useReducer(reducer, {
    author: {},
    loading: true,
    error: '',
  });

  const { key } = useParams();

  let user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_AUTHOR_START' });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/authors/key/${key}`,
          {
            headers: {
              token:
                'Bearer: ' +
                JSON.parse(localStorage.getItem('userInfo')).accessToken,
            },
          }
        );
        dispatch({ type: 'FETCH_AUTHOR_SUCCESS', payload: result.data });
        console.log(user);
        if (user.likedAuthors.includes(result.data.key)) {
          setFav(true);
        }
      } catch (err) {
        dispatch({ type: 'FETCH_AUTHOR_FAILURE', payload: error.message });
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleScroll = (event) => {
    setIsScrolled(event.currentTarget.scrollTop === 0 ? false : true);
  };

  const handleFavourited = async (e, authorId) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        {
          headers: {
            token:
              'Bearer: ' +
              JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
          authorId,
        }
      );
      if (user.likedAuthors.includes(authorId)) {
        const index = user.likedAuthors.indexOf(authorId);
        if (index > -1) {
          user.likedAuthors.splice(index, 1);
          setFav(false);
        }
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      } else {
        user.likedAuthors.push(authorId);
        setFav(true);
        localStorage.setItem('userInfo', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="author">
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="container" onScroll={handleScroll}>
            <div className="mainContainer">
              <div
                className="wrapper"
                style={{ backgroundImage: `url(${author?.coverImg})` }}
              >
                <div className="header">
                  <div className="right">
                    <span className="type">
                      <i className="iconBackground fa-solid fa-certificate fa-xl"></i>
                      <i className="checkIcon fa-solid fa-check"></i>
                      <span>Ellenőrzött előadó</span>
                    </span>
                    <h1 className="albumTitle">{author?.name}</h1>
                    <div className="bottomInfo">
                      {author?.listeners} hallgató havonta
                    </div>
                  </div>
                </div>
              </div>
              <div className="list">
                <div className="top">
                  <div className="left">
                    <i className="icon play fa-solid fa-circle-play fa-4x"></i>
                    <i className="icon shuffle fa-solid fa-shuffle fa-2x"></i>
                    <button
                      className="followButton"
                      onClick={(e) => handleFavourited(e, author?._id)}
                    >
                      {fav ? 'Követem' : 'Követés'}
                    </button>
                    <i className="icon more fa-solid fa-ellipsis fa-2x"></i>
                  </div>
                </div>
                <div className="head">
                  <h1>Népszerű</h1>
                </div>
                <div className="bottom">
                  {author?.songs.map((song, id) => (
                    <div key={id} className="song">
                      <div className="left">
                        <div className="number">{id + 1}</div>
                        <i className="playIcon fa-solid fa-play"></i>
                        <div className="info">
                          <img
                            src={song.coverImg}
                            alt=""
                            className="albumCover"
                          />
                          <div className="title">{song.title}</div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="plays">{song.listens}</div>
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
                <h1>Továbbiak tőle: {author.name}</h1>
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
            <div className="desc">
              <div className="head">
                <h1>Névjegy</h1>
              </div>
              <div
                className="container"
                style={{ backgroundImage: `url(${author?.descImg})` }}
              >
                <div className="info">
                  <div className="listens">
                    {author?.listeners} hallgató havonta
                  </div>
                  <div className="desc">{author?.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Author;
