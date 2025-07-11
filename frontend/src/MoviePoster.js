function MoviePoster({ posterPath, title }) {
  return posterPath ? (
    <img
      src={`https://image.tmdb.org/t/p/w200${posterPath}`}
      alt={title}
      style={{ width: '100px', height: 'auto' }}
    />
  ) : (
    <div>No image available</div>
  );
}

export default MoviePoster;