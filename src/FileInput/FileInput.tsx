import React from "react";
import styled from "styled-components";
import FormControl from "../FormControl/FormControl";

export default function FileInput({ onFileUpload, allowedTypes, label }:
  {
    onFileUpload: (file: File) => void,
    allowedTypes: string[],
    label: string
  }
) {

  const ref = React.useRef<any>();
  const id = React.useId();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      alert("No file was chosen!");
      return;
    }

    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      ref.current.value = '';
      console.log('Not a valid mime type!');
      return;
    }

    onFileUpload(file);
  }

  return (
    <FormControl label={label}>
      <input ref={ref} type='file' id={id} onChange={handleOnChange} />
    </FormControl>
  );
}