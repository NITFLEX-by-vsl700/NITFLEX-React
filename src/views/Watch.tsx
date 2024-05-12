import { useEffect, useState } from 'react';
import { Player, SubtitleTrack } from '../components/Player';
import { Movie, defaultMovie } from '../models/Movie';
import { Episode, defaultEpisode } from '../models/Episode';
import { Subtitle, defaultSubtitle } from '../models/Subtitle';
import './Watch.css';
import { Header } from '../components/Header';
import { backendUrl } from '../globals';

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

    // pathName = '/watch/{movieId}' or '/watch/{movieId}/{episodeId}'
    const pathNameSegments = getPathNameSegments();
    const movieId = pathNameSegments[1];
    const episodeId = getEpisodeId(episodes);

    // fetch necessary data
    useEffect(() => {
        if(movie !== defaultMovie)
            return;

        fetch(backendUrl + `/movies/${movieId}`)
            .then(response => response.json())
            .then((obj: Movie) => {
                setMovie(obj);

                if(obj.type === "Series"){
                    // fetch episodes as well
                    fetch(backendUrl + `/episodes/${movieId}`)
                        .then(response1 => response1.json())
                        .then((epsArr: Episode[]) => {
                            setEpisodes(epsArr);

                            fetch(backendUrl + `/subtitles/${obj.id}/episode/${getEpisodeId(epsArr)}`)
                            .then(response => response.json())
                            .then((subsArr: Subtitle[]) => {
                                setSubtitles(subsArr);
                                setReady(true);
                            })
                        })
                }else{
                    fetch(backendUrl + `/subtitles/${obj.id}/film`)
                    .then(response => response.json())
                    .then((subsArr: Subtitle[]) => {
                        setSubtitles(subsArr);
                        setReady(true);
                    })
                }
            });
    });

    let videoPath = `${backendUrl}/stream/${movie.type.toLowerCase()}/${movieId}`;
    if(movie.type === "Series")
        videoPath += `/${episodeId}`;
    
    return (
        <div>
            <Header navbar></Header>
            <div className='Watch'>
                {ready && <Player
                        width={700}
                        videoPath={videoPath} 
                        subtitlesPaths={subtitles.filter(s => s !== defaultSubtitle).map((s): SubtitleTrack => {return {src: `${backendUrl}/stream/subs/${movie.id}/${s.id}`, label: s.name}})} />}

                {!episodes.includes(defaultEpisode) && 
                    <div className='Watch-episodes'>
                        {episodes.map(e => 
                            <div key={e.id} className='Watch-episode-element'>
                                <a href={`/watch/${movieId}/${e.id}`}>{`S${numberToText(e.seasonNumber)}E${numberToText(e.episodeNumber)}`}</a>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export default Watch;
