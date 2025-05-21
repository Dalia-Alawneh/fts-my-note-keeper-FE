import { Fetch } from '@/api';
import { useEffect, useState } from 'react';


export function useFetch<T>(endpoint: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await Fetch<T>(endpoint, {
          ...options,
          signal: controller.signal,
        });
        setData(res);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint, JSON.stringify(options)]);

  return { data, error, loading };
}
