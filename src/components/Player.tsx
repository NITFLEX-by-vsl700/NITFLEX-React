import { useEffect } from "react";
import videojs from "video.js";
import "./Player.css";
import { GetToken } from "../utils/Token";
import { GetRequest } from "../utils/Requests";
import { backendUrl } from "../globals";

export interface SubtitleTrack {
    src: string,
    label: string
}

export const Player = (props: {width: number, height?: number, videoPath: string, subtitlesPaths: SubtitleTrack[], onVideoEnded?: () => void}) => {
    const videoURL = props.videoPath;
    const options = {
        preloadTextTracks: false,
        tracks: props.subtitlesPaths.map(p => {return {src: p.src, label: p.label, kind: 'subtitles', srclang: 'bul'}})
    };

    useEffect(() => {
        let player = videojs('videojs-player');
        player.width(props.width);
        player.height(props.height);
        player.on('xhr-hooks-ready', () => {
            const playerXhrRequestHook = (options: any) => {
                options.beforeSend = (xhr: any) => {
                    xhr.setRequestHeader('Authorization', `Bearer ${GetToken()}`);
                };
                return options;
            };
            
            (player.tech({ IWillNotUseThisInPlugins: true }) as any).vhs.xhr.onRequest(playerXhrRequestHook);
        });

        if(props.onVideoEnded)
          player.on('ended', props.onVideoEnded)

        player.src({ src: `${videoURL}/manifest.mpd`, type: 'application/dash+xml'});
        player.ready(() => {
            const createBlob = async (t: {src: string, label: string, kind: string, srclang: string}) => {
                let response = await GetRequest(t.src);
                return new Blob([response.data]);
            }

            // Load subtitles
            (async () => {
                for(let i = 0; i < options.tracks.length; i++){
                    let t = options.tracks[i];
                    let subtitleBlob = await createBlob(t);
                    let url = URL.createObjectURL(subtitleBlob);
                    player.addRemoteTextTrack({src: url, label: t.label, kind: t.kind, srclang: t.srclang});
                }
            })();
            
            return player;
        })
        player.play()
        return () => player.dispose();
    }, [props.height, props.width]);

    return (
        <video id='videojs-player'
        className="video-js"
        controls
        preload="auto">
            {/* {options.tracks.map(t => (<track key={t.src} src={t.src} kind={t.kind} srcLang={t.srclang} label={t.label} />))} */}
        </video>
    );
}
