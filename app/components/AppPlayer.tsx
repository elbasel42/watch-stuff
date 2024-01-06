"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  subtitles?: any;
}
export const AppPlayer = ({ url, subtitles }: Props) => {
  const playerRef: any = useRef();
  const [qualities, setQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState("");

  useEffect(() => {
    if (qualities.length === 0) return;
    const savedQualityIndex = localStorage.getItem("savedQualityIndex") ?? 0;
    setCurrentQuality(qualities[+savedQualityIndex]);
  }, [qualities]);

  const onQualityChange = (e: any) => {
    const selectedQuality = e.target.value;
    setCurrentQuality(selectedQuality);
    console.log({ selectedQuality });
    const player = playerRef.current.getInternalPlayer("hls");
    console.log({ player });
    qualities.forEach((q, index) => {
      if (q === +selectedQuality) {
        console.log("Found quality:", q, "with index", index);
        player.currentLevel = index;
        localStorage.setItem("savedQualityIndex", `${index}`);
      }
    });
  };

  const onPlayerReady = () => {
    const player: any = playerRef.current.getInternalPlayer("hls");

    //! Set quality
    const qualities = player.levels;
    const savedQualityIndex = localStorage.getItem("savedQualityIndex") ?? 0;
    setQualities(qualities.map((q: any) => q.height));
    console.log("Setting quality to ", +savedQualityIndex);
    player.currentLevel = +savedQualityIndex;

    setTimeout(() => {
      const player: any = playerRef.current.getInternalPlayer("hls");
      console.log({ currentLevel: player.currentLevel });
    }, 2000);

    //! Set subtitle
    const playerElem = document.querySelector("video");
    const textTracks = playerElem?.textTracks ?? [];
    textTracks[0].mode = "showing";
    console.log({ playerElem });
    console.log({ textTracks });
  };

  return (
    <div>
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
                if (s.lang === "Thumbnails") return;
                // let srcLang = "";
                // if (["en", "english"].includes(s.lang.toLowerCase())) {
                // srcLang = "en";
                // }
                return {
                  kind: "subtitles",
                  src: s.url,
                  label: s.lang,
                  // srclang: srcLang,
                };
              }),
            ],
          },
        }}
        onReady={onPlayerReady}
      />
      <select
        onChange={onQualityChange}
        name="quality"
        id="quality"
        className="bg-black rounded-3xl px-4 py-2"
        value={currentQuality}
      >
        {qualities.map((q) => {
          return <option value={q}>{q}p</option>;
        })}
      </select>
    </div>
  );
};
