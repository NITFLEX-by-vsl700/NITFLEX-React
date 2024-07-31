import { useEffect } from "react";
import videojs from "video.js";
import "./Player.css";
import "./videojs.css"
import { GetToken } from "../utils/Token";
import { GetRequest } from "../utils/Requests";
import { backendUrl } from "../globals";
import Player from "video.js/dist/types/player";

export interface SubtitleTrack {
    src: string,
    label: string
}

export const NitflexPlayer = (props: {width?: number, height?: number, title?: string, videoPath: string, subtitlesPaths: SubtitleTrack[]}) => {
    const videoURL = props.videoPath;
    const options = {
        preloadTextTracks: false,
        tracks: props.subtitlesPaths.map(p => {return {src: p.src, label: p.label, kind: 'subtitles', srclang: 'bul'}})
    };

    useEffect(() => {
        videojs.registerComponent('TitleBar', TitleBar);
        let player = videojs('videojs-player');

        if(props.title)
            var titleBar = player.addChild('TitleBar', {text: props.title});
        //player.width(props.width);
        //player.height(props.height);
        player.on('xhr-hooks-ready', () => {
            const playerXhrRequestHook = (options: any) => {
                options.beforeSend = (xhr: any) => {
                    xhr.setRequestHeader('Authorization', `Bearer ${GetToken()}`);
                };
                return options;
            };
            
            (player.tech({ IWillNotUseThisInPlugins: true }) as any).vhs.xhr.onRequest(playerXhrRequestHook);
        });
        
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
        player.play();
        return () => player.dispose();
    }, [props.height, props.width]);

    return (
        <video id='videojs-player'
        className="video-js"
        controls
        preload="auto"
        data-setup={/*!(props.width || props.height) && */'{"fluid": true}'}>
            {/* {options.tracks.map(t => (<track key={t.src} src={t.src} kind={t.kind} srcLang={t.srclang} label={t.label} />))} */}
        </video>
    );
}

// Get the Component base class from Video.js
const Component = videojs.getComponent('Component');

class TitleBar extends Component {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  constructor(player: Player, options: any = {}) {

    // It is important to invoke the superclass before anything else, 
    // to get all the features of components out of the box!
    super(player, options);

    // If a `text` option was passed in, update the text content of 
    // the component.
    if (options.text) {
      this.updateTextContent(options.text);
    }
  }

  // The `createEl` function of a component creates its DOM element.
  createEl() {
    return videojs.dom.createEl('div', {

      // Prefixing classes of elements within a player with "vjs-" 
      // is a convention used in Video.js.
      className: 'vjs-title-bar'
    });
  }

  // This function could be called at any time to update the text 
  // contents of the component.
  updateTextContent(text: string) {

    // If no text was provided, default to "Title Unknown"
    if (typeof text !== 'string') {
      text = 'Title Unknown';
    }

    // Use Video.js utility DOM methods to manipulate the content
    // of the component's element.
    videojs.dom.emptyEl(this.el());
    videojs.dom.appendContent(this.el(), text);
  }
}
