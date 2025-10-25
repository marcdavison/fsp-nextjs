"use client"
import { useState } from 'react';

const InputField = ({prediction, home, inputChange}: { prediction: any; home: boolean; inputChange: (e: any) => void}) => {

    const [value, setValue] = useState((prediction && home ? prediction.home : prediction && !home ? prediction.away : ''));

    function updatedValue(e: React.ChangeEvent<HTMLInputElement>) {
        const VAL = e.target.value;
        setValue(VAL);
        inputChange(e);
    }

    return <input pattern="[0-9]*" type="number" inputMode='numeric' maxLength={1} name={home ? "homescore" : "awayscore"} value={value}  onChange={updatedValue}></input>

}

export default InputField;

/*
'use client';

import { useState } from 'react';

export default function ScoreInput({ initialValue, name }: { initialValue?: number; name: string }) {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <input
      pattern="[0-9]*"
      maxLength={1}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
*/