//========= IMAGE ===========
import bdm from "./assets/bdm.png";
import headlogo from "./assets/headlogo.png";
import Hero from "./assets/Hero.webp";
import p1 from "./assets/p1.png";
import fb from "./assets/fb.png";
import x from "./assets/x.png";
import ig from "./assets/ig.png";
import whatsapp from "./assets/whatsapp.png";
import map from "./assets/map.png";
import empty from "./assets/empty.png";
import frame3 from "./assets/frame3.png";
import pay from "./assets/pay.png";
import youtube from "./assets/youtube.png";
import wha from "./assets/wha.png";
import danger from "./assets/danger.png";
import Hero2 from "./assets/Hero2.png";

export {
  Hero2,
  danger,
  youtube,
  wha,
  pay,
  bdm,
  headlogo,
  Hero as desktopHero,
  p1,
  fb,
  ig,
  x,
  whatsapp,
  map,
  empty,
  frame3,
};

// ============= Authentication Components ==========
import UserCreateAccount from "./authentication/create";

export { UserCreateAccount };

// ========= Navbar components ==========
import MainPageNavbar from "./mainpage/navbar/navbar";
import MainPageSearchBar from "./mainpage/navbar/search";
import MainPageHero from "./mainpage/Hero/Hero";
import MobileDropDown from "./mainpage/navbar/mobiledrop";

//============= User components ===============
import UserProfile from "./user/profile";

export { UserProfile };

export { MainPageNavbar, MainPageSearchBar, MainPageHero, MobileDropDown };
