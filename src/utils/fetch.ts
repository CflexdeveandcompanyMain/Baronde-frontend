const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

export async function getTestimony() {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const response = await fetch(`${API_ENDPOINT}/testimonial/v1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  return res;
}

export async function createTestimony(formDataToSend: FormData) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const response = await fetch(`${API_ENDPOINT}/testimonial/v1`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create testimonial");
  }
  return response.json();
}

export async function updateTestimony(id: string, formDataToSend: FormData) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const response = await fetch(`${API_ENDPOINT}/testimonial/v1/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update testimonial");
  }
  return response.json();
}

export async function deleteTestimony(id: string) {
  const token = localStorage.getItem("baron:admintoken") ?? "";
  const response = await fetch(`${API_ENDPOINT}/testimonial/v1/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete testimonial");
  }
  return response.json();
}

export function formatUpdatedAt(updatedAt: string | Date): string {
  const date = new Date(updatedAt);

  // Format time (e.g., 08:10PM)
  const time = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", ""); // removes space before AM/PM

  // Format date (e.g., 23 Mar 2022)
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${time} | ${day} ${month} ${year}`;
}
