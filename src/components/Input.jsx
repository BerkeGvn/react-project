import { forwardRef } from 'react';

/* eslint-disable react/prop-types */

const Input = forwardRef(function Input({ label, ...props }, ref) {
  // Todo: Accept forwarded ref and "connect" it to the <input> element
  return (
    <p className="control">
      <label>{label}</label>
      <input
        {...props}
        ref={ref}
      />
    </p>
  );
});

export default Input;
