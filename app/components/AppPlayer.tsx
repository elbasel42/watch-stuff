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
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  useEffect(() => {
    if (qualities.length === 0) return;
    const savedQualityIndex = localStorage.getItem("savedQualityIndex") ?? 0;
    setCurrentQuality(qualities[+savedQualityIndex]);
  }, [qualities]);

  const onSubtitleChange = (e: any) => {
    const selectedSubtitle = e.target.value;
    setCurrentSubtitle(selectedSubtitle);
    localStorage.setItem("savedSubtitleLang", selectedSubtitle);
    console.log({ selectedSubtitle });
    const playerElem = document.querySelector("video");
    const textTracks: any = playerElem?.textTracks ?? [];
    [...textTracks].forEach((t) => {
      const trackLabel = t.label;
      t.mode = "hidden";
      if (trackLabel === selectedSubtitle) {
        t.mode = "showing";
      }
    });
  };

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
    const savedSubtitleLang = localStorage.getItem("savedSubtitleLang");
    setCurrentSubtitle(savedSubtitleLang ?? "");
    console.log({ savedSubtitleLang });

    const playerElem = document.querySelector("video");
    const textTracks: any = playerElem?.textTracks ?? [];
    [...textTracks].forEach((t) => {
      const trackLabel = t.label;
      console.log({ trackLabel });
      console.log(trackLabel === savedSubtitleLang);
      t.mode = "hidden";
      if (trackLabel === savedSubtitleLang) t.mode = "showing";
    });

    // textTracks[0].mode = "showing";
    // console.log({ playerElem });
    // console.log({ textTracks });
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
      <div className="mt-4 flex gap-4">
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
        <select
          value={currentSubtitle}
          name="subtitle"
          id="subtitle"
          className="bg-black rounded-3xl px-4 py-2"
          onChange={onSubtitleChange}
        >
          {subtitles.map(({ lang }: { lang: string }) => {
            if (lang === "Thumbnails") return;
            return <option value={lang}>{lang}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
