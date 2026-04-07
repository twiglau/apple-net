import { useState, useEffect } from "react";
import { getMessage } from "../store/async-request";
import { messageStore } from "../store/async-request-and-custom-hook";

export function useQuery() {
  const message = messageStore((state) => state.message);
  const setMessage = messageStore((state) => state.setMessage);
  const [loading, setLoading] = useState(() => {
    return message?.value === "";
  });

  useEffect(() => {
    if (!loading) return;

    getMessage().then((data) => {
      setMessage({ value: data.value! });
      setLoading(false);
    });
  }, [loading]);

  return { message, loading, setLoading };
}
