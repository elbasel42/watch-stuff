"use client";
import {Player, Video} from '@vime/react';

interface Props {
  url: string;
}
export const AppPlayer = ({ url }: Props) => {
  return (
    <div>
      <Player controls>
        <Video crossOrigin="anonymous" >
          <source data-src={url} />
        </Video>
      </Player>
    </div>
  );
};
