import { Fetch } from '@/api';
import { useEffect, useState, useCallback, useRef } from 'react';

export function useFetch<T>(endpoint: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

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
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}