/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function Inputs(props) {
  let { placeholder , inputHandler , name} = props;
  return (
    <div>
      <input className='input-field' name={name} onChange={inputHandler} placeholder={placeholder}></input>
    </div>
  )
}
