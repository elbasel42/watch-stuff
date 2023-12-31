"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  text: string;
  className?: string;
}

export const ReadMore = ({ text, className }: Props) => {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <p className={className}>
      <span>{text.slice(0, 200)}</span>
      <span className={twMerge(!isReadMore && "hidden")}>
        {text.slice(200, text.length)}
      </span>
      <button
      className="mx-2 text-blue-600"
        onClick={() => {
          setIsReadMore(prev => !prev);
        }}
      >
        {isReadMore ? "View Less": "Read More"}
      </button>
    </p>
  );
};
