import { useEffect, useState } from 'react';
import axios from 'axios';
import MoviePoster from './MoviePoster';
import './styles/FavoritesPage.css'; 

const apiBaseUrl = process.env.REACT_APP_API_URL;

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const res = await axios.get(`${apiBaseUrl}/api/favorites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(res.data);
    }

    fetchFavorites();
  }, []);

  return (
  <div className="favorites-container">
    <h2>Your Saved Movies</h2>
    <div className="movie-list">
      {favorites.map(movie => (
        <div key={movie.id} className="movie-card">
          <MoviePoster posterPath={movie.poster_path} title={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  </div>
);
}

export default FavoritesPage;