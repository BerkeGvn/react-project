import { useRef } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

function App() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <>
      <h1>Refs</h1>
      <SearchButton onClickBtn={handleFocus}></SearchButton>
      <SearchInput ref={inputRef}></SearchInput>
    </>
  );
}

export default App;
