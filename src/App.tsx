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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserOrderHistory from "./user/order";
import Testimonial from "./mainpage/navbar/testimonial";
import ShoppingCartSystem from "./cart/cartpage";
import { ToastContainer } from "react-toastify";
import ForgetCode from "./authentication/codeforget";
import NewPassword from "./authentication/newpassword";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
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
        <Route path={"/order"} element={<UserOrderHistory />} />
        <Route path={"/testimonial"} element={<Testimonial />} />
        <Route path={"/cart"} element={<ShoppingCartSystem />} />
        <Route path={"/forgetcode"} element={<ForgetCode />} />
        <Route path={"/newpassword"} element={<NewPassword />} />
      </Routes>
    </QueryClientProvider>
  );
}
