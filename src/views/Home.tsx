import { useEffect, useState } from 'react';
import { Movie, defaultMovie } from '../models/Movie';
import './Home.css';
import './MovieCard.css'
import { Header } from '../components/Header';
import { backendUrl } from '../globals';

function Home() {
  const [movies, setMovies] = useState([defaultMovie]);

  const fetchMovies = () => {
    fetch(backendUrl + "/movies")
      .then(response => response.json())
      .then((arr: Movie[]) => {
        setMovies(arr);
      });
  }

  useEffect(() => {
    if(movies.includes(defaultMovie)){
      fetchMovies();
    }else{
      setTimeout(fetchMovies, 20000);
    }
  });

  return (
    <div>
      <Header navbar={true} />
      <div className="Home">
        <form className='Search-form'>
          <input type="text" name='search' placeholder='Search' />
        </form>
        <div className='Home-movies'>
          {movies.filter(m => m !== defaultMovie).map(m => 
            <MovieCard key={m.id} movie={m} />
          )}
        </div>
      </div>
    </div>
  );
}

const MovieCard = (props: {movie: Movie}) => {
  const watchMovie = () => {
    window.location.href = `/watch/${props.movie.id}`;
  }

  return (
    <div className='Movie-card'>
      <div className='Movie-card-data'>
        <h2 className='Movie-title'>{props.movie.name}</h2>
        <p className='Movie-added-by'>Added by {"vsl700"}</p>
      </div>
      <div className='Movie-card-action'>
        <MovieCardAction onClick={watchMovie}>Watch</MovieCardAction>
        <MovieCardAction onClick={() => {alert('Not implemented!')}}>Watch trailer</MovieCardAction>
      </div>
    </div>
  )
}

const MovieCardAction = (props: {onClick: Function, children: string}) => {
  return (
    <div className='Movie-card-option' onClick={() => props.onClick()}>
      <p className='Option-text'>{props.children}</p>
    </div>
  )
}

export default Home;
