import type { CredentialResponse } from "@react-oauth/google";

export async function getFetch(url: string) {
  const request = await fetch(url, {
    method: "GET",
  });
  const response = await request.json();
  return response;
}

export async function getOTP(name: string, email: string) {
  const request = await fetch(
    "https://baronde.onrender.com/user/v1/request-admin-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }
  );
  const response = await request.json();
  return response;
}

export async function getGoogleUserInfo(token: CredentialResponse) {
  const request = await fetch(`backendurl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const response = await request.json();
  return response;
}
