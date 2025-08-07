import type { CredentialResponse } from "@react-oauth/google";
import type { HeroDataType } from "../mainpage/Hero/data";

const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

export async function getFetch(url: string) {
  const request = await fetch(url, {
    method: "GET",
  });
  const response = await request.json();
  return response;
}

export async function getOTP(name: string, email: string) {
  const request = await fetch(`${API_ENDPOINT}/user/v1/request-admin-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });
  const response = await request.json();
  console.log(response);
  return response;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  otp: string,
  otpId: string,
  role: string
) {
  const request = await fetch(`${API_ENDPOINT}/user/v1/SignUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, otp, otpId, role }),
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

export async function createAdmin(
  name: string,
  email: string,
  password: string,
  role: string,
  otp: string,
  otpId: string
) {
  const request = await fetch(`${API_ENDPOINT}/user/v1/Signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, otp, otpId, role }),
  });
  if (
    request.ok &&
    request.headers.get("Authorization")?.startsWith("Bearer")
  ) {
    const token = request.headers.get("Authorization")?.split(" ")[1] ?? "";
    localStorage.setItem("baron:admintoken", token);
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
  const request = await fetch(`${API_ENDPOINT}/user/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const response = await request.json();
  if (
    request.ok &&
    request.headers.get("Authorization")?.startsWith("Bearer")
  ) {
    const token = request.headers.get("Authorization")?.split(" ")[1] ?? "";
    const { role } = response.user;
    if (role === "admin") {
      localStorage.setItem("baron:admintoken", token);
    } else sessionStorage.setItem("baron:token", token);
  }
  return response;
}

export async function requestOtp(email: string) {
  const request = await fetch(
    `${API_ENDPOINT}/user/v1/request-resetpassword-otp`,
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
  const request = await fetch(`${API_ENDPOINT}/user/v1/new-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp, otpId, newPassword: password }),
  });
  console.log(request.status);
  return await request.json();
}

export async function getImagesByCategory(category: string) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(
    `${API_ENDPOINT}/image/v1/categories/:` + category,
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
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(`${API_ENDPOINT}/image/v1/name/:` + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(`${API_ENDPOINT}/image/v1/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  if (response.data) return response.data;
  return [];
}

// getCountryAndState();

getProducts();

export async function removeFn(id: string) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(`${API_ENDPOINT}/image/v1/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  return await request.json();
}

export async function editFn(id: string, data: HeroDataType) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(`${API_ENDPOINT}/image/v1/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await request.json();
}

export async function addToCartFn(productId: string, quantity: number) {
  const token = sessionStorage.getItem("baron:token") ?? "";
  try {
    const request = await fetch(`${API_ENDPOINT}/cart/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function IncrementCartFn(productId: string, quantity: number) {
  const token = sessionStorage.getItem("baron:token") ?? "";
  const request = await fetch(`${API_ENDPOINT}/cart/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return await request.json();
}
export async function DecrementCartFn(productId: string, quantity: number) {
  const token = sessionStorage.getItem("baron:token") ?? "";
  const request = await fetch(`${API_ENDPOINT}/cart/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return await request.json();
}

export async function DeleteCartFn(productId: string) {
  const token = sessionStorage.getItem("baron:token") ?? "";
  try {
    const request = await fetch(`${API_ENDPOINT}/cart/v1/item/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await request.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function getCart() {
  const token = sessionStorage.getItem("baron:token") ?? "";
  const request = await fetch(`${API_ENDPOINT}/cart/v1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await request.json();
}

export async function checkoutFn(shippingAddress: any) {
  const token = sessionStorage.getItem("baron:token") ?? "";
  const response = await fetch(`${API_ENDPOINT}/order/v1/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shippingAddress }),
  });
  return response;
}

export async function getOrderFn() {
  const token = sessionStorage.getItem("baron:token") ?? "";
  const response = await fetch(`${API_ENDPOINT}/order/v1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  return res;
}

export async function adminAnalytics() {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const request = await fetch(`${API_ENDPOINT}/order-analytics/v1/analytics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
}
