import { useEffect, useState } from "react";

export const imgcar = [
  {
    url: "https://res.cloudinary.com/dmaag3pvx/image/upload/v1754076799/fact-bg_ug6ixj.png",
  },
  {
    url: "https://res.cloudinary.com/dmaag3pvx/image/upload/v1754076778/Hero2_aokq4i.png",
  },
  {
    url: "https://res.cloudinary.com/dmaag3pvx/image/upload/v1754077143/Hero_ra67no.png",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgcar.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  return (
    <div className="w-full h-[280px] sm:h-[400px] lg:h-[500px] relative overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imgcar.map((item, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={item.url}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-transparent hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div
          className="h-full bg-emerald-800 transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlaying
              ? `${((currentIndex + 1) / imgcar.length) * 100}%`
              : "0%",
          }}
        />
      </div>

      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
