import { useEffect } from "react";
import videojs from "video.js";
import "./Player.css";

const Player = (props: {videoPath: string}) => {
    const BASE_URL = "http://localhost:8080"; // TEMPORARY
    const videoURL = `${BASE_URL}/${props.videoPath}`;

    useEffect(() => {
        let player = videojs('videojs-player');
        player.src({ src: `${videoURL}/manifest.mpd`, type: 'application/dash+xml' });
    });

    return (
        <video id='videojs-player'
        className="video-js"
        controls
        preload="auto"></video>
    );
}

export default Player