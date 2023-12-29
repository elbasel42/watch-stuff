"use client";

import { createRef, useRef } from "react";
import ReactPlayer from "react-player";

// import { Player, Hls, DefaultUi } from "@vime/react";

interface Props {
  url: string;
  subtitleUrl?: string;
  onEnded?: Function;
}
export const AppPlayer = ({ url, subtitleUrl }: Props) => {
  const playerRef: any = useRef();
  return (
    <ReactPlayer url={url} ref={playerRef} controls 
    config={{
      file: {
        attributes: {

          crossOrigin: "anonymous"
        },
        tracks: [
          {kind: "subtitles", src: subtitleUrl, srcLang: "en", default: true, label: "English"}
        ]
      }
    }}
    onReady={() => {
      const player: any = playerRef.current.getInternalPlayer('hls');
      console.log(player.levels)
      player.currentLevel = 0;
      setTimeout(() => {
        console.log({currentLevel: player.currentLevel})
      }, 1000); 
    }}/>
  )
//   return (
//     <div className="w-1/2">
//       <Player>
//         <Hls crossOrigin="anonymous">
//           <source data-src={url} type="application/x-mpegURL" />
//         </Hls>
//         <DefaultUi />
//         <track
//           default
//           kind="subtitles"
//           // src={subtitleUrl ?? ""}
//           src="https://ccb.megaresources.co/c9/6d/c96d8ba5cea6c3ccd7d76c36f0fa073d/c96d8ba5cea6c3ccd7d76c36f0fa073d.vtt"
//           srcLang="en"
//           label="English"
//         />
//       </Player>
//     </div>
//   );
};