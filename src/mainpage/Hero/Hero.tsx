import HeroProductCard from "./herocard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroCarousel from "../../utils/carousel";
import { HeroObject } from "../../raw-datas/rd1";

export default function MainPageHero() {
  return (
    <section className="flex flex-col items-center w-full bg-slate-100/50">
      <HeroCarousel />
      <section className="flex flex-col items-start sm:w-[95%] mx-auto w-full bg-slate-50 py-7">
        <HeroIntro />
        <section className="w-full flex justify-end p-3 fixed bottom-5 sm:bottom-6 right-5 z-50">
          <Link
            to={
              "https://wa.me/2349138254838?text=`Hello!, I'm interested in your servce`"
            }
            className="flex flex-row items-center gap-3 cursor-pointer"
          >
            <img
              src={
                "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752576538/Amplifier/whatsap_rpuamp.png"
              }
              className="sm:w-16 sm:h-16 w-13 h-13 object-cover"
            />
          </Link>
        </section>
        {HeroObject.map((item, index) => {
          const { title, product } = item;
          return (
            <div className="w-full sm:p-1 p-3" key={index}>
              <HeroSection title={title} product={product} />
            </div>
          );
        })}
      </section>
      <section className="py-7 flex flex-col items-center gap-4 overflow-hidden w-full px-3"></section>
    </section>
  );
}

export function HeroIntro() {
  return (
    <motion.section
      initial={{ scale: 0.4, opacity: 0.5, left: -20 }}
      whileInView={{ scale: 1, opacity: 1, right: -20 }}
      transition={{ duration: 0.8 }}
      className="w-full flex flex-col items-center justify-center gap-3"
    >
      <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
        <p className="font-all font-semibold text-2xl text-center w-full">
          Featured <span className="text-[#E5A000] font-all">Products</span>
        </p>
        <p className="font-all text-sm text-center w-full">
          Experience the perfect harmony of sound and craftsmanship at
          Barondemusical — your destination for premium musical instruments and
          audio gear. Discover unmatched quality, lasting durability, and
          performance that inspires every note.
        </p>
      </div>
    </motion.section>
  );
}

const divFn = (title: string, url: string) => {
  return (
    <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
      <p className="font-all font-semibold text-base sm:text-lg text-start p-3 w-full self-center">
        {title}
      </p>
      <Link to={`/product/${url}`} className="w-full">
        <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
          view all
        </p>
      </Link>
    </div>
  );
};

function HeroSection(prop: { title: string; product: string }) {
  const { title, product } = prop;

  return (
    <section className="w-full flex flex-col items-center justify-center gap-3">
      {divFn(title, product)}
      <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
        <HeroProductCard category={product} />
      </div>
    </section>
  );
}
