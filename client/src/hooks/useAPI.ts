import { useState, useEffect, useCallback, useRef } from "react";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import API from "@/services/api";

interface UseApiOptions<T> {
  autoFetch?: boolean;
  initialData?: T;
}

interface UseApiResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: AxiosError | Error | null;
  status: "idle" | "loading" | "success" | "error";
  refetch: () => Promise<T | undefined>;
  /** For mutations: execute with new/overriding config */
  execute: (
    overrideConfig?: Partial<AxiosRequestConfig>,
  ) => Promise<T | undefined>;
}

export function useApi<T = unknown>(
  config: AxiosRequestConfig,
  options: UseApiOptions<T> = {},
): UseApiResult<T> {
  const { autoFetch = false, initialData } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<AxiosError | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >(autoFetch ? "loading" : "idle");

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0); // prevent race conditions

  const makeRequest = useCallback(
    async (overrideConfig?: Partial<AxiosRequestConfig>) => {
      // Cleanup previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const currentId = ++requestIdRef.current;

      setError(null);
      setIsLoading(true);
      setStatus("loading");

      try {
        const mergedConfig: AxiosRequestConfig = {
          ...config,
          ...overrideConfig,
        };

        const response: AxiosResponse<T> = await API(mergedConfig);
        // Only update if this is the latest request
        if (currentId === requestIdRef.current) {
          setData(response.data);
          setStatus("success");
        }
        return response.data;
      } catch (err: any) {
        if (err.name === "CanceledError") return; // ignore aborted

        setError(err);
        setStatus("error");

        throw err;
      } finally {
        if (currentId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [config], // ← config is dependency → refetch on change
  );

  // Auto-fetch on mount / when config changes
  useEffect(() => {
    if (autoFetch) {
      makeRequest();
    }

    // Cleanup: abort on unmount or config change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [makeRequest, autoFetch]);

  const refetch = useCallback(() => makeRequest(), [makeRequest]);

  const execute = useCallback(
    (overrideConfig?: Partial<AxiosRequestConfig>) =>
      makeRequest(overrideConfig),
    [makeRequest],
  );

  return {
    data,
    isLoading,
    error,
    status,
    refetch,
    execute, // useful for POST/PUT/DELETE
  };
}
