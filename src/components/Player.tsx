import { useEffect } from "react";
import videojs from "video.js";
import "./Player.css";
import { GetToken } from "../utils/Token";

export interface SubtitleTrack {
    src: string,
    label: string
}

export const Player = (props: {width: number, height?: number, videoPath: string, subtitlesPaths: SubtitleTrack[]}) => {
    const videoURL = props.videoPath;

    useEffect(() => {
        let options = {
            tracks: props.subtitlesPaths.map(p => {return {src: p.src, label: p.label, kind: 'subtitles', srclang: 'bul'}})
        };
        
        console.log(options);
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
        console.log(player.tech());
        player.src({ src: `${videoURL}/manifest.mpd`, type: 'application/dash+xml'});
        options.tracks.forEach(t => player.addRemoteTextTrack(t))
        return () => player.dispose();
    }, [props.height, props.width]);

    return (
        <video id='videojs-player'
        className="video-js"
        crossOrigin="use-credentials"
        controls
        preload="auto"></video>
    );
}
