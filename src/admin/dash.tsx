import type { JSX } from "react";

type H = {
  title: string;
  icon: JSX.Element;
  count: number;
}[];

export default function AdminMain({ data }: { data: H }) {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-lg sm:text-2xl text-start font-semibold font-all">
            Welcome, SoundPrince!
          </p>
          <p className="text-sm text-stone-400 text-start font-medium font-all">
            Take a look at your products today!
          </p>
        </div>
      </div>
      <section className="flex flex-col sm:flex-row items-center w-full gap-3 mt-5">
        {data.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg"
            >
              <div className="flex flex-row items-center w-full justify-between">
                <p className="font-all text-lg sm:text-2xl font-semibold text-start">
                  {item.count}
                </p>
                <div className="p-2 shadown">{item.icon}</div>
              </div>
              <p className="font-all text-base text-start w-full font-medium text-stone-500">
                {item.title}
              </p>
              <p className="font-semibold text-start w-full">----</p>
            </div>
          );
        })}
      </section>
    </>
  );
}
