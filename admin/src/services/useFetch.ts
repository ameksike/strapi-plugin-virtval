import { useState, useEffect, useCallback } from "react";

/**
 * @description Custom hook for making fetch requests with support for dependency memorization.
 * @param url API URL to fetch
 * @param options Request options 
 * @param deps Additional dependencies to control the execution of the effect
 */
function useFetch<T>(url: string, options?: RequestInit, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const controller = new AbortController();
            const signal = controller.signal;
            if (options?.method === "GET" && options?.body) {
                delete options.body;
            }
            const response = await fetch(url, { ...options, signal });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [url, ...deps]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, refetch: fetchData };
}

export default useFetch;