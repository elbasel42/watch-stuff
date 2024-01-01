"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const Nav = () => {
  let savedSearchTarget = "";
  useEffect(() => {
    savedSearchTarget = localStorage.getItem("searchTarget") ?? "anime";
  }, []);

  const [searchTarget, setSearchTarget] = useState(savedSearchTarget);
  return (
    <nav className="flex gap-2 items-center mb-8">
      <Link href="/" className="flex items-center">
        <MdHomeFilled className="w-8 h-8 lg:w-14 lg:h-14 text-white" />
      </Link>
      <form
        action={`/search/${searchTarget}`}
        className="flex flex-1 gap-2 items-center border border-black"
      >
        <input
          type="search"
          name="query"
          id="query"
          className="font-mono lg:text-xl px-4 py-2 border bg-black  border-white text-white rounded-3xl flex-1"
        />
        <button className="border border-black">
          <IoMdSearch className="w-8 h-8 lg:w-14 lg:h-14 text-white" />
        </button>
        <div className="flex gap-2 border border-white rounded-full">
          <button
            type="button"
            className={twMerge(
              "px-2 py-2 rounded-full",
              searchTarget === "anime" && "bg-blue-500"
            )}
            onClick={() => {
              setSearchTarget("anime");
              localStorage.setItem("searchTarget", "anime");
            }}
          >
            Anime
          </button>
          <button
            type="button"
            className={twMerge(
              "px-2 py-2 rounded-full",
              searchTarget === "manga" && "bg-blue-500"
            )}
            onClick={() => {
              setSearchTarget("manga");
              localStorage.setItem("searchTarget", "manga");
            }}
          >
            Manga
          </button>
        </div>
      </form>
    </nav>
  );
};
