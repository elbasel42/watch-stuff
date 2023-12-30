import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";

export const Nav = () => {
  return (
    <nav className="flex gap-2">
      <Link href="/">
        <MdHomeFilled className="w-14 h-14 text-white" />
      </Link>
      <form
        action="/search"
        className="flex flex-1 gap-2 items-center border border-black mb-8"
      >
        <input
          type="search"
          name="query"
          id="query"
          className="font-mono text-xl px-4 py-2 border bg-slate-900 text-white border-black rounded-3xl flex-1"
        />
        <button className="border border-black">
          <IoMdSearch className="w-14 h-14 text-white" />
        </button>
      </form>
    </nav>
  );
};
