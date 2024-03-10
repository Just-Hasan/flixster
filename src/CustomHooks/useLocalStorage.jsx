import { useState, useEffect } from "react";

export default function useLocalStorage(initialValue, key) {
  const [data, setData] = useState(() => {
    const localStoragValue = JSON.parse(localStorage.getItem(key));
    return localStoragValue ? localStoragValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
