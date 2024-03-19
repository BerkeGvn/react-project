import { useState, useEffect } from "react";

export function useFetchData(fetchFn, initialVal) {

  const [fetchedData, setFetchedData] = useState(initialVal);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);

  return { fetchedData, setFetchedData, isFetching, error }
}