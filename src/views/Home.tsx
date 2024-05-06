import { useEffect, useState } from 'react';
import { Movie, defaultMovie } from '../models/Movie';
import './Home.css';
import './MovieCard.css'
import { Header } from '../components/Header';

function Home() {
  const [movies, setMovies] = useState([defaultMovie]);

  const BASE_URL = "http://localhost:8080"; // TEMPORARY

  const fetchMovies = () => {
    fetch(BASE_URL + "/movies")
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
  return (
    <div className='Movie-card'>
      <div className='Movie-card-data'>
        <h2 className='Movie-title'>{props.movie.name}</h2>
        <p className='Movie-added-by'>Added by {"vsl700"}</p>
      </div>
      <div className='Movie-card-action'>
        <MovieCardAction>Watch</MovieCardAction>
        <MovieCardAction>Watch trailer</MovieCardAction>
      </div>
    </div>
  )
}

const MovieCardAction = (props: {children: string}) => {
  return (
    <div className='Movie-card-option'>
      <p className='Option-text'>{props.children}</p>
    </div>
  )
}

export default Home;
