import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url, {
      method: 'GET',
      credentials: "same-origin"
    });
    const json = await response.json();
    setData(json.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
export { useFetch };