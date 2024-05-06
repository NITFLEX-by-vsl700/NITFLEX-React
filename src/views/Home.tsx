import { useEffect, useState } from 'react';
import { Movie, defaultMovie } from '../models/Movie';
import './Home.css';
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
            <div key={m.id} className='Home-movie-element'>
              <a href={`/watch/${m.id}`}>{m.name}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
