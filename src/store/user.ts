// store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  id: string;
  name: string;
  email: string;
  password: string;
  otp: string;
  otpid: string;
  isVerified: boolean;
  setCredentials: (
    name: string,
    email: string,
    password: string,
    id: string
  ) => void;
  setOtp: (otp: string) => void;
  setOtpId: (otp: string) => void;
  verifyOtp: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  id: "",
  name: "",
  email: "",
  password: "",
  otp: "",
  isVerified: false,
  otpid: "",

  setCredentials: (name, email, password, id) => {
    set({ name, email, password, id });
  },

  setOtp: (otp) => {
    set({ otp });
  },
  setOtpId: (otpid) => {
    set({ otpid });
  },

  verifyOtp: () => {
    set({ isVerified: true });
  },

  reset: () => {
    set({
      name: "",
      email: "",
      password: "",
      otp: "",
      isVerified: false,
    });
  },
}));
