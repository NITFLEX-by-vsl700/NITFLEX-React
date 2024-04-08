import { useEffect, useState } from 'react';
import { Player, SubtitleTrack } from '../Player';
import { Movie, defaultMovie } from '../models/Movie';
import { Episode, defaultEpisode } from '../models/Episode';
import { Subtitle, defaultSubtitle } from '../models/Subtitle';
import './Watch.css';

function Watch(){
    const [movie, setMovie] = useState(defaultMovie);
    const [episodes, setEpisodes] = useState([defaultEpisode]);
    const [subtitles, setSubtitles] = useState([defaultSubtitle]);
    const [ready, setReady] = useState(false);

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

    const getEpisodeId = (epsArr: Episode[]): string => {
        return pathNameSegments[2] !== undefined ? pathNameSegments[2] : epsArr[0].id;
    }

    const BASE_URL = "http://localhost:8080"; // TEMPORARY

    // pathName = '/watch/{movieId}' or '/watch/{movieId}/{episodeId}'
    const pathNameSegments = getPathNameSegments();
    const movieId = pathNameSegments[1];
    const episodeId = getEpisodeId(episodes);

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

                            fetch(BASE_URL + `/subtitles/${obj.id}/episode/${getEpisodeId(epsArr)}`)
                            .then(response => response.json())
                            .then((subsArr: Subtitle[]) => {
                                setSubtitles(subsArr);
                                setReady(true);
                            })
                        })
                }else{
                    fetch(BASE_URL + `/subtitles/${obj.id}/film`)
                    .then(response => response.json())
                    .then((subsArr: Subtitle[]) => {
                        setSubtitles(subsArr);
                        setReady(true);
                    })
                }
            });
    });

    let videoPath = `${BASE_URL}/stream/${movie.type.toLowerCase()}/${movieId}`;
    if(movie.type === "Series")
        videoPath += `/${episodeId}`;
    
    return (
        <div className='Watch'>
            {ready && <Player 
                    videoPath={videoPath} 
                    subtitlesPaths={subtitles.filter(s => s !== defaultSubtitle).map((s): SubtitleTrack => {return {src: `${BASE_URL}/stream/subs/${movie.id}/${s.id}`, label: s.name}})} />}

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
