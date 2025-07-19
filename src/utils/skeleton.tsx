export default function Skeleton() {
  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div className="h-full bg-stone-500 animate-pulse w-full rounded"></div>
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center w-full">
          <div className="bg-stone-500 animate-pulse w-full"></div>
          <div className="bg-stone-500 animate-pulse w-full"></div>
        </div>
        <div className="bg-stone-500 animate-pulse w-full"></div>
      </div>
    </div>
  );
}
