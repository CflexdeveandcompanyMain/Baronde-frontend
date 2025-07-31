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
import ForgetCode from "./authentication/codeforget";
import NewPassword from "./authentication/newpassword";
import ProductPage from "./dynamic/productpage";
import CartPage from "./cart/cartpage";
import SingleProductPage from "./dynamic/singlepage";
import AdminDashboard from "./admin/admin";
import SearchPage from "./dynamic/searchpage";
import Checkout from "./checkout/product";
import AllDeals from "./dynamic/alldeal";
import AdminCreate from "./authentication/admincreate";
import CheckoutSuccess from "./checkout/onSuccess";
import CheckoutFailure from "./checkout/onFailure";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"/forgetcode"} element={<ForgetCode />} />
        <Route path={"/newpassword"} element={<NewPassword />} />
        <Route path={"/product/:category"} element={<ProductPage />} />
        <Route
          path={"/singleproduct/:category"}
          element={<SingleProductPage />}
        />
        <Route path={"/admin"} element={<AdminDashboard />} />
        <Route path={"/search/:keyword"} element={<SearchPage />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/brand/:brand"} element={<AllDeals />} />
        <Route path={"/adminsignup"} element={<AdminCreate />} />
        <Route path={"/checkout/success"} element={<CheckoutSuccess />} />
        <Route path={"/checkout/failure"} element={<CheckoutFailure />} />
      </Routes>
    </QueryClientProvider>
  );
}
