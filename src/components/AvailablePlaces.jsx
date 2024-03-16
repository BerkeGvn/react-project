/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaiblePlaces, setAviablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const data = await response.json();
      setAviablePlaces(data.places);
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={avaiblePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
