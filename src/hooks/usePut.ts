import { useState } from "react";
import { Fetch } from "@/api";

export const usePUT = <T = unknown, R = unknown>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const put = async (body: T): Promise<R | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await Fetch<R>(url, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { put, loading, error };
};
