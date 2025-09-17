import { useAuth } from "../contexts/useAuth";
import { useError } from "../contexts/useError";
import { BASE_URL } from "./env";

export function useApi() {
  const { accessToken } = useAuth();

  const { setError, setGood } = useError();

  const callApi = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      setError("API call failed");
      setGood(false);
      return;
    }
    return res.json();
  };

  return { callApi };
}
