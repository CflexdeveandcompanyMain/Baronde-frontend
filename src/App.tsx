import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/main";
import UserCreateAccount from "./authentication/create";
import UserSignInInterface from "./authentication/login";
import ForgotPassword from "./authentication/forgot";
import VerifyCode from "./authentication/code";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<UserCreateAccount />} />
      <Route path="/signin" element={<UserSignInInterface />} />
      <Route path={"/forgot"} element={<ForgotPassword />} />
      <Route path={"/code"} element={<VerifyCode />} />
    </Routes>
  );
}
