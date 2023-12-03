import React from 'react'
import error from './error.png';
import './error.css'
import useTitle from '../../changeDocTitle/docTitle';
const Error = () => {
  useTitle('Error Page');

  return (
    <div className=" error">
    <img src={error} alt="" />

    </div>
  )
}

export default Error