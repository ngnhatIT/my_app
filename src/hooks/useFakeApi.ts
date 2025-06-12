// src/hooks/useFakeApi.ts
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // tuỳ chỉnh nếu cần

export const useFakeApi = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/${endpoint}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // POST
  const createItem = async (item: Partial<T>) => {
    const res = await axios.post(`${API_BASE_URL}/${endpoint}`, item);
    setData((prev) => [...prev, res.data]);
    return res.data;
  };

  // PUT
  const updateItem = async (id: string, item: Partial<T>) => {
    const res = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, item);
    setData((prev) => prev.map((d: any) => (d.id === id ? res.data : d)));
    return res.data;
  };

  // DELETE
  const deleteItem = async (id: string) => {
    await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
    setData((prev) => prev.filter((d: any) => d.id !== id));
  };

  return {
    data,
    loading,
    error,
    refetch,
    setData,
    createItem,
    updateItem,
    deleteItem,
  };
};
