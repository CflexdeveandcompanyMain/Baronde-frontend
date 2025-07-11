import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/main";
import UserCreateAccount from "./authentication/create";
import UserSignInInterface from "./authentication/login";
import ForgotPassword from "./authentication/forgot";
import VerifyCode from "./authentication/code";
import { UserProfile } from ".";
import UserSetting from "./user/setting";
import About from "./mainpage/navbar/about";
import TermsOfService from "./misc/terms";
import PrivatePolicy from "./misc/policy";
import ShippingPolicy from "./misc/shipping";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<UserCreateAccount />} />
      <Route path="/signin" element={<UserSignInInterface />} />
      <Route path={"/forgot"} element={<ForgotPassword />} />
      <Route path={"/code"} element={<VerifyCode />} />
      <Route path={"/profile"} element={<UserProfile />} />
      <Route path={"/settings"} element={<UserSetting />} />
      <Route path={"/about"} element={<About />} />
      <Route path={"/term"} element={<TermsOfService />} />
      <Route path={"/policy"} element={<PrivatePolicy />} />
      <Route path={"/shipping"} element={<ShippingPolicy />} />
    </Routes>
  );
}
