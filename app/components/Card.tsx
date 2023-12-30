import Link from "next/link";

interface Props {
    url: string;
    imageUrl: string;
    title: string;
}

export const Card = ({url, imageUrl, title}: Props) => {
  return (
    <div className="bg-slate-800 text-white rounded-3xl overflow-hidden">
      <Link href={url}>
        <div className="flex flex-col items-center gap-4">
          <img
            src={imageUrl}
            alt=""
            // width={320}
            className="block object-top object-cover w-full h-32 lg:h-64"
          />
          <h3 className="text-center">{title}</h3>
        </div>
      </Link>
    </div>
  );
};
