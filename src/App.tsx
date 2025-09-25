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
import AdminDashboard, { ProtectedRoute } from "./admin/admin";
import SearchPage from "./dynamic/searchpage";
import Checkout from "./checkout/product";
import AllDeals from "./dynamic/alldeal";
import CheckoutSuccess from "./checkout/onSuccess";
import CheckoutFailure from "./checkout/onFailure";
import Contact from "./mainpage/navbar/contact";
import ErrorBoundary from "./utils/Error";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <MainPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/signup"
          element={
            <ErrorBoundary>
              <UserCreateAccount />
            </ErrorBoundary>
          }
        />
        <Route
          path="/signin"
          element={
            <ErrorBoundary>
              <UserSignInInterface />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/forgot"}
          element={
            <ErrorBoundary>
              <ForgotPassword />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/code"}
          element={
            <ErrorBoundary>
              <VerifyCode />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ErrorBoundary>
              <UserProfile />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/settings"}
          element={
            <ErrorBoundary>
              <UserSetting />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/about"}
          element={
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/term"}
          element={
            <ErrorBoundary>
              <TermsOfService />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/policy"}
          element={
            <ErrorBoundary>
              <PrivatePolicy />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/shipping"}
          element={
            <ErrorBoundary>
              <ShippingPolicy />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/contact"}
          element={
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/order"}
          element={
            <ErrorBoundary>
              <UserOrderHistory />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/testimonial"}
          element={
            <ErrorBoundary>
              <Testimonial />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/cart"}
          element={
            <ErrorBoundary>
              <CartPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/forgetcode"}
          element={
            <ErrorBoundary>
              <ForgetCode />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/newpassword"}
          element={
            <ErrorBoundary>
              <NewPassword />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/product/:category"}
          element={
            <ErrorBoundary>
              <ProductPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/singleproduct/:category"}
          element={
            <ErrorBoundary>
              <SingleProductPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/admin"}
          element={
            <ErrorBoundary>
              <ProtectedRoute child={<AdminDashboard />} />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/search/:keyword"}
          element={
            <ErrorBoundary>
              <SearchPage />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/checkout"}
          element={
            <ErrorBoundary>
              <Checkout />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/brand/:brand"}
          element={
            <ErrorBoundary>
              <AllDeals />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/checkout/success"}
          element={
            <ErrorBoundary>
              <CheckoutSuccess />
            </ErrorBoundary>
          }
        />
        <Route
          path={"/checkout/failure"}
          element={
            <ErrorBoundary>
              <CheckoutFailure />
            </ErrorBoundary>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
