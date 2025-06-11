
import { useEffect, useState } from "react";
import axios from "axios";

export const useFakeApi = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/${endpoint}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
};
