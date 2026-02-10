import { refreshToken } from "../auth/signup/actions"
import { getSession } from "../session"

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>
}

export async function authFetch(url: string | URL, Options: FetchOptions) {
  const session = await getSession();

  // 1. Initial Authorization Header setup
  // Use optional chaining (?.) and provide a fallback
  Options.headers = {
    ...Options.headers,
    Authorization: `Bearer ${session?.accessToken || ""}`,
  };

  let response = await fetch(url, Options);

  // 2. Handle Token Expiration (401)
  if (response.status === 401) {
    // Check if session exists AND has a refresh token
    if (!session?.refreshToken) {
      // Instead of just throwing, you might want to redirect to login
      throw new Error("Session expired or refresh token not found");
    }

    // Try to get a new access token
    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      // Update headers with the NEW token
      // Note: Fixed the typo "Bearear" to "Bearer"
      Options.headers.Authorization = `Bearer ${newAccessToken}`;
      
      // Retry the fetch exactly once
      response = await fetch(url, Options);
    }
  }

  return response;
}