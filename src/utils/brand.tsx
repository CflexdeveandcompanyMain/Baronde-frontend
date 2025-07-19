import { Link } from "react-router-dom";

export default function BrandLogo({ img }: { img: string }) {
  return (
    <Link
      to={"/"}
      className="flex flex-row items-center justify-start sm:justify-center gap-0.5 sm:-ml-2 self-center w-1/2"
    >
      <img
        src={img}
        className="w-10 h-10 sm:w-10 sm:h-10 rounded object-cover"
      />
      <div className="flex flex-col items-start">
        <p className="font-all font-semibold text-xl text-white">Baron</p>
        <p className="font-all text-[12px] text-start text-white -mt-1">
          Demusical
        </p>
      </div>
    </Link>
  );
}
