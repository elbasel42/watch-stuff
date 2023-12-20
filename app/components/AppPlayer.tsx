"use client";
import { Player, Hls } from "@vime/react";

interface Props {
  url: string;
}
export const AppPlayer = ({ url }: Props) => {
  return (
    <div>
      <Player controls>
        <Hls crossOrigin="anonymous">
          <source data-src={url} type="application/x-mpegURL" />
        </Hls>
      </Player>
    </div>
  );
};
