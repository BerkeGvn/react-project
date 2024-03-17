/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setisFetching] = useState(false);
  const [error, setError] = useState(false);
  const [avaiblePlaces, setAviablePlaces] = useState([]);

  useEffect(() => {
    setisFetching(true);
    async function fetchPlaces() {
      try {
        const response = await fetch('http://localhost:3000/places');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        setAviablePlaces(data.places);
      } catch (error) {
        setError({ message: error.message || 'Failed to Fetch' });
      }

      setisFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <Error
        title={'An Error Occured'}
        message={error.message}
      ></Error>
    );
  }

  return (
    <Places
      title="Available Places"
      places={avaiblePlaces}
      isLoading={isFetching}
      isLoadingText={'Fetching the data...'}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
