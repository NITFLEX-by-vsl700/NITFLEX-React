import { useEffect, useState } from 'react';
import Player from '../Player';
import { Movie, defaultMovie } from '../models/Movie';
import { Episode, defaultEpisode } from '../models/Episode';
import './Watch.css';

function Watch(){
    const [movie, setMovie] = useState(defaultMovie);
    const [episodes, setEpisodes] = useState([defaultEpisode]);

    const getPathNameSegments = (): string[] => {
        let result = window.location.pathname.substring(1);
        if(result.endsWith('/'))
            result = result.substring(0, result.lastIndexOf('/'));

        return result.split('/');
    }

    const numberToText = (num: number): string => {
        if(num < 10)
            return '0' + num;

        return num.toString();
    }

    const BASE_URL = "http://localhost:8080"; // TEMPORARY

    // pathName = '/watch/{movieId}' or '/watch/{movieId}/{episodeId}'
    const pathNameSegments = getPathNameSegments();
    const movieId = pathNameSegments[1];
    const episodeId = pathNameSegments[2] !== undefined ? pathNameSegments[2] : episodes[0].id;

    // fetch necessary data
    useEffect(() => {
        if(movie !== defaultMovie)
            return;

        fetch(BASE_URL + `/movies/${movieId}`)
            .then(response => response.json())
            .then((obj: Movie) => {
                setMovie(obj);

                if(obj.type === "Series"){
                    // fetch episodes as well
                    fetch(BASE_URL + `/episodes/${movieId}`)
                        .then(response1 => response1.json())
                        .then((epsArr: Episode[]) => {
                            setEpisodes(epsArr);
                        })
                }
            });
    });

    let videoPath = `stream/${movie.type.toLowerCase()}/${movieId}`;
    if(movie.type === "Series")
        videoPath += `/${episodeId}`;
    
    return (
        <div className='Watch'>
            {movie !== defaultMovie 
                && ((movie.type === "Series" && !episodes.includes(defaultEpisode)) || movie.type !== "Series") 
                && <Player videoPath={videoPath} />}

            <div className='Watch-episodes'>
                {episodes.filter(e => e !== defaultEpisode).map(e => 
                    <div key={e.id} className='Watch-episode-element'>
                        <a href={`/watch/${movieId}/${e.id}`}>{`S${numberToText(e.seasonNumber)}E${numberToText(e.episodeNumber)}`}</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watch;
