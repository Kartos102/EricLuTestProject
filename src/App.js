import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [showListPage, setShowListPage] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/movies');
      const payload = await response.json();
      setMovies(payload);
    }
    getData();
  }, []);
  
  function handleClickMovie(movie) {
    setSelectedMovie(movie);
    setShowListPage(false);
  }
  
  function handleClickBack() {
    setSelectedMovie(null);
    setShowListPage(true);
  }
  
  function renderListPage() {
    return (
      <>
        <p>Nice Movies:</p>
        <div className='text-[#2200ff]'>
          {movies.map((movie) => (
            <div className="" key={movie.id} onClick={() => handleClickMovie(movie)}>
              <div className=''>{movie.title}</div>
              <div  className=''>{movie.tagline}</div>
              <div  className=''>Rating: {movie.vote_average / 2} out of 5</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  function renderSingleMoviePage() {
    const { id, title, overview, release_date, runtime, tagline, vote_average } = selectedMovie;
    const releaseDate = new Date(release_date).toLocaleDateString();

    return (
      <>
        <button onClick={handleClickBack}>Back to list</button>
        <div className="movie-details">
          <h2>{title}</h2>
          <p>{tagline}</p>
          <p>Release date: {releaseDate}</p>
          <p>Runtime: {runtime} minutes</p>
          <p>Rating: {vote_average / 2} out of 5</p>
          <p>{overview}</p>
        </div>
      </>
    );
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and your changes will live-update automatically.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <p>Nice Movies:</p>
  //       <p>{JSON.stringify(movies)}</p>
        
  //     </header>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showListPage ? (
          <>
            {renderListPage()}
          </>
        ) : (
          renderSingleMoviePage()
        )}
      </header>
    </div>
  );

}

export default App;
