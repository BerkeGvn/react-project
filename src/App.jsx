import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './fetch.js';
import Error from './components/Error.jsx';
import { useFetchData } from './components/hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const {
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
    isFetching,
    error,
  } = useFetchData(fetchUserPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setUpdateError({ message: error.message || 'an error occured when updating places' });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id),
      );

      try {
        await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
      } catch (error) {
        setUserPlaces(userPlaces);
        setUpdateError({ message: error.message || 'an error occured when deleting places' });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces],
  );

  function handleUpdateError() {
    setUpdateError(null);
  }

  return (
    <>
      <Modal
        open={updateError}
        onClose={handleUpdateError}
      >
        {updateError && (
          <Error
            title={'An error Occured'}
            message={updateError.message}
            onConfirm={handleUpdateError}
          ></Error>
        )}
      </Modal>

      <Modal
        open={modalIsOpen}
        onClose={handleStopRemovePlace}
      >
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img
          src={logoImg}
          alt="Stylized globe"
        />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or you have visited.
        </p>
      </header>
      <main>
        {error && (
          <Error
            title="An error occurred!"
            message={error.message}
          />
        )}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
