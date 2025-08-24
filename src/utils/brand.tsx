import { Link } from "react-router-dom";

export default function BrandLogo({
  img,
  color,
}: {
  img: string;
  color: string;
}) {
  return (
    <Link
      to={"/"}
      className="flex flex-row items-center justify-start sm:justify-start gap-0.5 sm:-ml-2 self-center w-1/2"
    >
      <img src={img} className="w-9 h-9 rounded object-cover" />
      <div className="flex flex-col items-start">
        <p className={`font-all font-semibold text-lg text-${color}`}>Baron</p>
        <p className={`font-all text-[12px] text-start text-${color} -mt-2`}>
          Demusical
        </p>
      </div>
    </Link>
  );
}
