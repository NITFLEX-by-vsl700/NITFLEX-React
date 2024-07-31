import { useEffect, useState } from 'react';
import { NitflexPlayer, SubtitleTrack } from '../components/Player';
import { Movie } from '../models/Movie';
import { Episode, defaultEpisode } from '../models/Episode';
import { Subtitle, defaultSubtitle } from '../models/Subtitle';
import './Watch.css';
import { backendUrl } from '../globals';
import { GetRequest } from '../utils/Requests';

function Watch(props: {movie: Movie}){
    const [movie] = useState(props.movie);
    const [episodes, setEpisodes] = useState([defaultEpisode]);
    const [subtitles, setSubtitles] = useState([defaultSubtitle]);
    const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(0);
    const [ready, setReady] = useState(false);

    const numberToText = (num: number): string => {
        if(num < 10)
            return '0' + num;

        return num.toString();
    }

    const onEpisodeClick = (episodeId: string) => {
        window.location.href = `/watch/${movie.id}/${episodeId}`;
    }

    const changeEpisode = (number: number) => {
        setCurrentEpisodeNumber(number);
        setReady(false);
    }

    const openFullscreen = () => {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen({navigationUI: "hide"});
        } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
            (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) { /* IE11 */
            (elem as any).msRequestFullscreen();
        }
    }

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) { /* Safari */
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) { /* IE11 */
            (document as any).msExitFullscreen();
        }
    }

    const closeWatchPage = () => {
        closeFullscreen();
    }

    // pathName = '/watch/{movieId}' or '/watch/{movieId}/{episodeId}'
    const getMovieId = () => movie.id;
    const getEpisodeId = (episodes: Episode[]) => episodes[currentEpisodeNumber].id;

    // axios.get necessary data
    useEffect(() => {
        if(ready)
            return

        //setTimeout(openFullscreen, 1000)
        openFullscreen()

        if(movie.type === "Series"){
            // axios.get episodes
            GetRequest(backendUrl + `/episodes/${getMovieId()}`)
                .then(response1 => response1.data)
                .then((epsArr: Episode[]) => {
                    setEpisodes(epsArr);

                    // axios.get subtitles
                    GetRequest(backendUrl + `/subtitles/${movie.id}/episode/${getEpisodeId(epsArr)}`)
                    .then(response => response.data)
                    .then((subsArr: Subtitle[]) => {
                        setSubtitles(subsArr);
                        setReady(true);
                    })
                })
        }else{
            // axios.get subtitles
            GetRequest(backendUrl + `/subtitles/${movie.id}/film`)
            .then(response => response.data)
            .then((subsArr: Subtitle[]) => {
                setSubtitles(subsArr);
                setReady(true);
            })
        }
    });

    let videoPath = `${backendUrl}/stream/${movie.type.toLowerCase()}/${getMovieId()}`;
    if(movie.type === "Series")
        videoPath += `/${getEpisodeId(episodes)}`;
    
    return (
        <div>
            <div className='Watch'>
                {ready && <NitflexPlayer
                        title={movie.name}
                        videoPath={videoPath} 
                        subtitlesPaths={subtitles.filter(s => s !== defaultSubtitle).map((s): SubtitleTrack => {return {src: `${backendUrl}/stream/subs/${movie.id}/${s.id}`, label: s.name}})} />}

                {/* {!episodes.includes(defaultEpisode) && 
                    <div className='Watch-episodes'>
                        {episodes.map(e => 
                            <div key={e.id} className='Watch-episode-element' onClick={() => {onEpisodeClick(e.id)}}>
                                {`S${numberToText(e.seasonNumber)}E${numberToText(e.episodeNumber)}`}
                                {getEpisodeId(episodes) === e.id && <p className='Current-element'>Current</p>}
                            </div>
                        )}
                    </div>
                } */}
            </div>
        </div>
    );
}

export default Watch;
