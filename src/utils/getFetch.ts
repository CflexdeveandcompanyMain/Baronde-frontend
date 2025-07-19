import type { CredentialResponse } from "@react-oauth/google";

const token = sessionStorage.getItem("baron:token") ?? "";

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
  console.log(response);
  return response;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  otp: string,
  otpId: string
) {
  const request = await fetch("https://baronde.onrender.com/user/v1/SignUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, otp, otpId }),
  });
  if (
    request.ok &&
    request.headers.get("Authorization")?.startsWith("Bearer")
  ) {
    const token = request.headers.get("Authorization")?.split(" ")[1] ?? "";
    sessionStorage.setItem("baron:token", token);
  }
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
  console.log(response);
  return response;
}

export async function userLogIn(email: string, password: string) {
  const request = await fetch("https://baronde.onrender.com/user/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (
    request.ok &&
    request.headers.get("Authorization")?.startsWith("Bearer")
  ) {
    const token = request.headers.get("Authorization")?.split(" ")[1] ?? "";
    sessionStorage.setItem("baron:token", token);
  }
  return await request.json();
}

export async function requestOtp(email: string) {
  const request = await fetch(
    "https://baronde.onrender.com/user/v1/request-resetpassword-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  console.log(request.status);
  return await request.json();
}

export async function resetPassword(
  email: string,
  otp: string,
  otpId: string,
  password: string
) {
  const request = await fetch(
    "https://baronde.onrender.com/user/v1/new-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, otpId, password }),
    }
  );
  console.log(request.status);
  return await request.json();
}

export async function getImagesByCategory(category: string) {
  console.log(token);
  const request = await fetch(
    "https://baronde.onrender.com/image/v1/categories/:" + category,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await request.json();
  console.log(response);
}

export async function getImagesByName(name: string) {
  console.log(token);
  const request = await fetch(
    "https://baronde.onrender.com/image/v1/name/:" + name,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await request.json();
  console.log(response);
}

export async function getCountryAndState() {
  const request = await fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "Nigeria",
      }),
    }
  );
  return await request.json();
}

export async function getProducts() {
  const request = await fetch("https://baronde.onrender.com/image/v1/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response.data;
}

getCountryAndState();

getProducts();

export async function removeItem(id: string) {
  const request = await fetch("", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  return await request.json();
}
