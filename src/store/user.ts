// store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  name: string;
  email: string;
  password: string;
  otp: string;
  otpid: string;
  isVerified: boolean;
  setCredentials: (name: string, email: string, password: string) => void;
  setOtp: (otp: string) => void;
  setOtpId: (otp: string) => void;
  verifyOtp: (inputOtp: string) => boolean;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  name: "",
  email: "",
  password: "",
  otp: "",
  isVerified: false,
  otpid: "",

  setCredentials: (name, email, password) => {
    set({ name, email, password });
  },

  setOtp: (otp) => {
    set({ otp });
  },
  setOtpId: (otpid) => {
    set({ otpid });
  },

  verifyOtp: (inputOtp) => {
    const { otp } = get();
    const isVerified = otp === inputOtp;
    if (isVerified) {
      set({ isVerified: true });
    }
    return isVerified;
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
