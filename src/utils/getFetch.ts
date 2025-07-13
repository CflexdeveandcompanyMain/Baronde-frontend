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

export async function getGoogleUserInfo(token: string) {
  const request = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await request.json();
  return response;
}
