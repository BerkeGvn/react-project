import { useRef, useState } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

function App() {
  const inputRef = useRef(null);

  return (
    <>
      <h1>Refs</h1>
      <SearchButton></SearchButton>
      <SearchInput></SearchInput>
    </>
  );
}

export default App;
