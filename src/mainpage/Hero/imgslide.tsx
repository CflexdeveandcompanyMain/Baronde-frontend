// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
// import { desktopHero } from "../..";

// export default function HeroSlider() {
//   const images = [
//     {
//       url: desktopHero,
//       title: "Mountain Landscape",
//     },
//     {
//       url: desktopHero,
//       title: "Ocean Waves",
//     },
//     {
//       url: desktopHero,
//       title: "Forest Trail",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex, isPlaying, images.length]);

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const goToPrevious = () => {
//     setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
//   };

//   const goToNext = () => {
//     setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="relative w-full h-[180px] sm:h-auto max-h-[500px] overflow-hidden">
//       <div className="relative w-full h-full">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <img
//               src={image.url}
//               alt={image.title}
//               className="w-full h-full object-cover"
//             />
//             {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={goToPrevious}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
//         aria-label="Previous image"
//       >
//         <ChevronLeft size={24} />
//       </button>

//       <button
//         onClick={goToNext}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
//         aria-label="Next image"
//       >
//         <ChevronRight size={24} />
//       </button>

//       <button
//         onClick={togglePlayPause}
//         className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
//         aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
//       >
//         {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//       </button>

//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? "bg-white scale-125"
//                 : "bg-white bg-opacity-50 hover:bg-opacity-75"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
//         <div
//           className={`h-full bg-white transition-all duration-300 ${
//             isPlaying ? "animate-pulse" : ""
//           }`}
//           style={{
//             width: `${((currentIndex + 1) / images.length) * 100}%`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }
