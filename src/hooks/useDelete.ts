import { useState } from "react";
import { Fetch } from "@/api";

export const useDelete = <T = unknown>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const destroy = async (id: string): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await Fetch<T>(`${url}/${id}`, {
        method: "DELETE"
      });
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { destroy, loading, error };
};
