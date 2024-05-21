import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, defaultMovie } from '../models/Movie';
import './Home.css';
import './MovieCard.css'
import { Header } from '../components/Header';
import { backendUrl } from '../globals';
import { Modal } from '../components/Modal';
import { Player, SubtitleTrack } from '../components/Player';
import { Subtitle, defaultSubtitle } from '../models/Subtitle';

function Home() {
  const [movies, setMovies] = useState([defaultMovie]);

  const fetchMovies = () => {
    axios.get(backendUrl + "/movies", { withCredentials: true })
      .then(response => response.data)
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
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  const watchMovie = () => {
    window.location.href = `/watch/${props.movie.id}`;
  }

  const openTrailerModal = () => {
    setTrailerModalOpen(true);
  }

  const closeTrailerModal = () => {
    setTrailerModalOpen(false);
  }

  // Make 'Watch trailer' action inactive if no trailer
  // Fix modal closing errors and bugs
  // Auto-refresh of the Home page makes the player reload

  return (
    <div className='Movie-card'>
      <div className='Movie-card-data'>
        <h2 className='Movie-title'>{props.movie.name}</h2>
        <p className='Movie-added-by'>Added by {"vsl700"}</p>
      </div>
      <div className='Movie-card-action'>
        <MovieCardAction onClick={watchMovie}>Watch</MovieCardAction>
        <MovieCardAction onClick={openTrailerModal}>Watch trailer</MovieCardAction> {/* If no trailer, the action should be inactive */}
      </div>
      <Modal isOpen={trailerModalOpen} onClose={closeTrailerModal}>
        <TrailerPlayerContainer movie={props.movie}/>
      </Modal>
    </div>
  )
}

const MovieCardAction = (props: {disabled?: boolean, onClick: Function, children: string}) => {
  return (
    <div className={`Movie-card-option${props.disabled ? ' disabled' : ''}`} onClick={() => props.onClick()}>
      <p className='Option-text'>{props.children}</p>
    </div>
  )
}

const TrailerPlayerContainer = (props: {movie: Movie}) => {
  const [subtitles, setSubtitles] = useState([defaultSubtitle]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if(ready)
      return;

    axios.get(backendUrl + `/subtitles/${props.movie.id}/trailer`, { withCredentials: true })
      .then(response => response.data)
      .then((subsArr: Subtitle[]) => {
          setSubtitles(subsArr);
          setReady(true);
      })
  });

  return (
    <div className='Trailer-player-container'>
      {ready && <Player width={400} videoPath={`${backendUrl}/stream/trailer/${props.movie.id}`} subtitlesPaths={subtitles.filter(s => s !== defaultSubtitle).map((s): SubtitleTrack => {return {src: `${backendUrl}/stream/subs/${props.movie.id}/${s.id}`, label: s.name}})} />}
    </div>
  )
}

export default Home;
