import { useEffect, useState } from 'react';
import axios from 'axios';
import MoviePoster from './MoviePoster';
import { Link } from 'react-router-dom';
import './styles/SearchPage.css'; 

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  
  useEffect(() => {
    async function fetchPopularMovies() {
      setError('');
      try {
        const res = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: { api_key: apiKey }
        });
        setResults(res.data.results.slice(0, 5));
      } catch (err) {
        setError('Could not load movies: ' + (err.response?.status || err.message));
      }
    }

    fetchPopularMovies();
  }, [apiKey]);

  
  async function searchMovies() {
    setError('');
    setSaveMessage('');
    if (!query) return;

    try {
      const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: { api_key: apiKey, query }
      });
      setResults(res.data.results);
    } catch (err) {
      setError('Failed to fetch movies: ' + (err.response?.status || err.message));
      setResults([]);
    }
  }

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  async function saveMovie(movie) {
    try {
      await axios.post(`${apiBaseUrl}/api/favorites`, { movie }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSaveMessage(`"${movie.title}" saved!`);
    } catch (err) {
      setSaveMessage('Failed to save movie.');
    }
  }

  return (
    <div className="search-container">
      <h2>Discover Movies</h2>

      <div className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={searchMovies} disabled={!query}>Search</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Link to="/favorites">View Favorite Movies</Link>
      </div>

      {error && <div className="feedback error">{error}</div>}
      {saveMessage && <div className="feedback success">{saveMessage}</div>}

      <div className="results-grid">
        {results.map(movie => (
          <div key={movie.id} className="result-card">
            <MoviePoster posterPath={movie.poster_path} title={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => saveMovie(movie)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;