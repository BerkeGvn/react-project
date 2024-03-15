import { useRef, forwardRef, useImperativeHandle } from 'react';

const SearchInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));
  return (
    <input
      {...props}
      ref={inputRef}
      placeholder="search"
    ></input>
  );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;
