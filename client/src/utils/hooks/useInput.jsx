import { useState } from "react";

function useInput(initialValue) {
  const init = initialValue;
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue({
        ...value,
        [event.target.name]: event.target.value
    });
  }

  function clearInput (event) {
    setValue(init);
  }

  return [value, handleChange, clearInput];
}

export default useInput;