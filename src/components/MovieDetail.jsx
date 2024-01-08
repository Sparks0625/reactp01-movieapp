import FavButton from './FavButton';
import WatchlistButton from './WatchlistButton';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../features/favs/favsSlice';
import MovieThumbnail from './MovieThumbnail';
import { addWatchlistItem, deleteWatchlistItem } from '../features/favs/watchlistSlice';

function MovieDetail({ movieObj, isFav, isOnWatchlist }) {
  const dispatch = useDispatch();

  function handleFavClick(addToFav, obj) {
    if (addToFav === true) {
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }
  }

  function handleWatchlistClick(addToWatchlist, obj) {
    if (addToWatchlist === true) {
      dispatch(addWatchlistItem(obj));
    } else {
      dispatch(deleteWatchlistItem(obj));
    }
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail-panel">
        <MovieThumbnail key={movieObj.id} movie={movieObj} isFav={isFav} isOnWatchlist={isOnWatchlist}/>
        <div className="movie-description">
          <p>{movieObj.title}</p>
          <p>{movieObj.vote_average}</p>
          <p>{movieObj.release_date}</p>
          <p>{movieObj.genre_ids}</p>
          <p>{movieObj.overview}</p>
        </div>
      </div>
      <div className="btn-favourite">
        {isFav ? (
          <FavButton
            characterObj={movieObj}
            remove={true}
            handleFavClick={handleFavClick}
          />
        ) : (
          <FavButton characterObj={movieObj} handleFavClick={handleFavClick} />
        )}
      </div>
      <div className="btn-watchlist">
        {isOnWatchlist ? (
          <WatchlistButton
            characterObj={movieObj}
            remove={true}
            handleWatchlistClick={handleWatchlistClick}
          />
        ) : (
          <WatchlistButton characterObj={movieObj} handleWatchlistClick={handleWatchlistClick} />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
