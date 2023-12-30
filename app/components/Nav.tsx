import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";

export const Nav = () => {
  return (
    <nav className="flex gap-2 items-center mb-8">
      <Link href="/" className="flex items-center">
        <MdHomeFilled className="w-8 h-8 lg:w-14 lg:h-14 text-white" />
      </Link>
      <form
        action="/search"
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
      </form>
    </nav>
  );
};
