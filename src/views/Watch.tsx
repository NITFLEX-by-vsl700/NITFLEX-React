import { useEffect, useState } from 'react';
import { Player, SubtitleTrack } from '../components/Player';
import { Movie, defaultMovie } from '../models/Movie';
import { Episode, defaultEpisode } from '../models/Episode';
import { Subtitle, defaultSubtitle } from '../models/Subtitle';
import './Watch.css';
import { Header } from '../components/Header';
import { backendUrl } from '../globals';
import { GetRequest } from '../utils/Requests';

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

    const onEpisodeClick = (episodeId: string) => {
        window.location.href = `/watch/${movie.id}/${episodeId}`;
    }

    // pathName = '/watch/{movieId}' or '/watch/{movieId}/{episodeId}'
    const pathNameSegments = getPathNameSegments();
    const movieId = pathNameSegments[1];
    const episodeId = getEpisodeId(episodes);

    // axios.get necessary data
    useEffect(() => {
        if(movie !== defaultMovie)
            return;

        GetRequest(backendUrl + `/movies/${movieId}`)
            .then(response => response.data)
            .then((obj: Movie) => {
                setMovie(obj);

                if(obj.type === "Series"){
                    // axios.get episodes as well
                    GetRequest(backendUrl + `/episodes/${movieId}`)
                        .then(response1 => response1.data)
                        .then((epsArr: Episode[]) => {
                            setEpisodes(epsArr);

                            GetRequest(backendUrl + `/subtitles/${obj.id}/episode/${getEpisodeId(epsArr)}`)
                            .then(response => response.data)
                            .then((subsArr: Subtitle[]) => {
                                setSubtitles(subsArr);
                                setReady(true);
                            })
                        })
                }else{
                    GetRequest(backendUrl + `/subtitles/${obj.id}/film`)
                    .then(response => response.data)
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
                            <div key={e.id} className='Watch-episode-element' onClick={() => {onEpisodeClick(e.id)}}>
                                {(e.seasonNumber !== 0 || e.episodeNumber !== 0) && 
                                    `S${numberToText(e.seasonNumber)}E${numberToText(e.episodeNumber)}`}
                                {<p className='Episode-name'>{e.name}</p>}
                                {episodeId === e.id && <p className='Current-element'>Current</p>}
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export default Watch;
