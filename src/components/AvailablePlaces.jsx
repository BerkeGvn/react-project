/* eslint-disable react/prop-types */
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvaiblePlaces } from '../fetch.js';
import { useFetchData } from './hooks/useFetch.js';

async function fetchSortedPlaces() {
  const places = await fetchAvaiblePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude,
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { fetchedData: avaiblePlaces, error, isFetching } = useFetchData(fetchSortedPlaces, []);

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
