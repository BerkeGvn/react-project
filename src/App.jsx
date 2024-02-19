import { useRef } from 'react';
import Input from './components/Input';

export const userData = {
  name: '',
  email: '',
};

export default function App() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  function handleSaveData() {
    userData.name = nameRef.current.value;
    userData.email = emailRef.current;

    console.log(userData);
  }

  return (
    <div id="app">
      <Input
        type="text"
        label="Your Name"
        ref={nameRef}
      />
      <Input
        type="email"
        label="Your E-Mail"
        ref={emailRef}
      />
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
      <img
        src="../public/asd.svg"
        alt=""
      />
      <img
        src="../public/asd.svg"
        alt=""
      />
      <h3>control</h3>
    </div>
  );
}
