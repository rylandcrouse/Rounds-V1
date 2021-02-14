import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue({
        ...value,
        [event.target.name]: event.target.value
    });
  }

  return [value, handleChange];
}

export default useInput;