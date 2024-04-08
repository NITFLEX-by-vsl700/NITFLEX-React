import { useEffect } from "react";
import videojs from "video.js";
import "./Player.css";

export interface SubtitleTrack {
    src: string,
    label: string
}

export const Player = (props: {videoPath: string, subtitlesPaths?: SubtitleTrack[]}) => {
    const videoURL = props.videoPath;

    useEffect(() => {
        let options;
        if(props.subtitlesPaths !== undefined){
            options = {tracks: props.subtitlesPaths.map(p => {return {src: p.src, label: p.label, kind: 'subtitles', srclang: 'bul'}})};
        }else{
            options = {};
        }

        console.log(options);
        let player = videojs('videojs-player', options);
        player.src({ src: `${videoURL}/manifest.mpd`, type: 'application/dash+xml' });
    });

    return (
        <video id='videojs-player'
        className="video-js"
        controls
        preload="auto"></video>
    );
}
