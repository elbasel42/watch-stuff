"use client";

import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  subtitles?: any;
}
export const AppPlayer = ({ url, subtitles }: Props) => {
  const playerRef: any = useRef();

  useEffect(() => {}, []);
  return (
    <ReactPlayer
      url={url}
      ref={playerRef}
      controls
      config={{
        file: {
          attributes: {
            crossOrigin: "anonymous",
          },
          tracks: [
            ...subtitles?.map((s: { url: string; lang: string }) => {
              let srcLang = "";
              if (s.lang === "Thumbnails") return;
              if (["en", "english"].includes(s.lang.toLowerCase())) {
                srcLang = "en";
              }

              return {
                kind: "subtitles",
                src: s.url,
                label: s.lang,
                srclang: srcLang,
              };
            }),
          ],
        },
      }}
      onReady={() => {
        const player: any = playerRef.current.getInternalPlayer("hls");
        console.log(player.levels);
        player.currentLevel = 0;
        setTimeout(() => {
          console.log({ currentLevel: player.currentLevel });
        }, 1000);

        const playerElem = document.querySelector("video");
        const textTracks = playerElem?.textTracks ?? [];
        textTracks[0].mode = "showing";
        console.log({ playerElem });
        console.log({ textTracks });
      }}
    />
  );
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
