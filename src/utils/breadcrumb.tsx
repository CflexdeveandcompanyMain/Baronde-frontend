import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BreadCrumb({
  path,
  url,
}: {
  path: String[];
  url: string;
}) {
  return path.map((item, index) => {
    if (item === "Home")
      return (
        <Link
          key={index}
          to={"/"}
          className="hover:text-orange-500 font-all text-xs font-medium"
        >
          {item}
        </Link>
      );
    if (item === path[path.length - 1])
      return (
        <div key={index} className="flex flex-row items-center gap-1">
          <ChevronRight size={15} />
          <Link
            key={index}
            to={`/${url}/${item}`}
            className="hover:text-orange-500 font-all text-xs font-medium"
          >
            {item}
          </Link>
        </div>
      );
    return (
      item && (
        <div key={index} className="flex flex-row items-center gap-1">
          <ChevronRight size={15} />
          <p className="font-all text-xs font-medium">{item}</p>
        </div>
      )
    );
  });
}
