/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvaiblePlaces } from '../fetch.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setisFetching] = useState(false);
  const [error, setError] = useState(false);
  const [avaiblePlaces, setAviablePlaces] = useState([]);

  useEffect(() => {
    setisFetching(true);
    async function fetchPlaces() {
      try {
        const places = await fetchAvaiblePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAviablePlaces(sortedPlaces);
        });
        setisFetching(false);
      } catch (error) {
        setError({ message: error.message || 'Failed to Fetch' });
      }
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
