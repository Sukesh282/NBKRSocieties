import { useError } from "../contexts/useError";
import { BASE_URL } from "./env";

export function useApi() {
  const { setError, setGood } = useError();

  const callApi = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
    };

    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      const reaction = await res.json();
      setError(reaction.message || "API call failed");
      setGood(false);
      return;
    }
    return res.json();
  };

  return { callApi };
}
