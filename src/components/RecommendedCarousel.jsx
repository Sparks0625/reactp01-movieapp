import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { fetchRecommendedMovies } from '../data/tmdb-data';
import MovieThumbnail from './MovieThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function RecommendedCarousel({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState(null);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      const movies = await fetchRecommendedMovies(movieId);
      setRecommendedMovies(movies);
    };

    getRecommendedMovies();
  }, []);

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClick}
        className="slider-arrow prev"
      />
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClick}
        className="slider-arrow next"
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    adaptiveHeight: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings} className="recommended-carousel">
      {!recommendedMovies
        ? null
        : recommendedMovies.map((movie) => {
            return <MovieThumbnail key={movie.id} movieObj={movie} />;
          })}
    </Slider>
  );
}
