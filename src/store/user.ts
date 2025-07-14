// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface AuthState {
  id: string;
  name: string;
  email: string;
  password: string;
  otp: string;
  isVerified: boolean;
  otpid: string;
  setCredentials: (
    name: string,
    email: string,
    password: string,
    id: string
  ) => void;
  setOtp: (otp: string) => void;
  setOtpId: (otpid: string) => void;
  verifyOtp: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
          id: "",
          name: "",
          email: "",
          password: "",
          otp: "",
          otpid: "",
          isVerified: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        id: state.id,
      }),
    }
  )
);
