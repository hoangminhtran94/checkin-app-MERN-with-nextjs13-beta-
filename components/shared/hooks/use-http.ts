import { useState, useCallback, useRef, useEffect } from "react";
import { useTypedDispatch } from "../../../store";
import { toggleErrorToast } from "../../../store/actionStatus";
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatchThunk = useTypedDispatch();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body: body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        dispatchThunk(toggleErrorToast(err.message));
        setIsLoading(false);
      }
    },
    [dispatchThunk]
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, sendRequest };
};
