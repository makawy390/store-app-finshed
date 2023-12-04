import React from 'react'
import useTitle from '../../changeDocTitle/docTitle'
// import { useSelector } from 'react-redux';
import './home.css'
const Home = () => {
  useTitle('Home');
  // const name =  useSelector(state => state.data.username);
  const fullName = sessionStorage.getItem("full name")
  // console.log(name);
  return (

    <div className='home'>
      <h3>Hello {fullName}  from app store  </h3>
    </div>
  )
}

export default Home