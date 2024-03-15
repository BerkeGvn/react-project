import { forwardRef } from 'react';

const SearchInput = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      placeholder="search"
    ></input>
  );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;
