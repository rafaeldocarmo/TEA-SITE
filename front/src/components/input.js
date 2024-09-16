import React from 'react'
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from 'primereact/inputmask';

const Input = ({name, type, mask, onChange, label}) => {

  return (
    <FloatLabel>
        {type === 'text' ? (
            <InputText id={name} type={name} onChange={onChange} mask={mask} />
        ): (
            <InputMask id={name} type={name} onChange={onChange} mask={mask} />
        )}
        <label htmlFor={name}>{label}</label>
    </FloatLabel>
  )
}

export default Input