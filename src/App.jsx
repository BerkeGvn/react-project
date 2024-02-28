import { useState } from 'react';

function App() {
  const [fullname, setFullname] = useState({
    name: '',
    surname: '',
  });

  function setName(e) {
    const newName = e.target.value;
    setFullname((prev) => {
      return {
        ...prev,
        name: newName,
      };
    });
  }
  function setSurname(e) {
    const newSurname = e.target.value;
    setFullname((asd) => {
      return {
        ...asd,
        surname: newSurname,
      };
    });
  }

  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        onChange={setName}
      />
      <input
        type="text"
        name="surname"
        id="surname"
        onChange={setSurname}
      />
      <h1>
        {fullname.name} {fullname.surname}
      </h1>
    </>
  );
}

export default App;
