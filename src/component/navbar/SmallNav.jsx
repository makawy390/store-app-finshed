import React from 'react'
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SmallNav = ({active}) => {
  // const role = useSelector(state => state.data.login);
const role = sessionStorage.getItem("role")
  return (
    <div>
      <ul className={`item-list ${active}`}>
      {role === null? "" : <>
      <li><NavLink to='/home'>Home</NavLink></li>
      <li><NavLink to='/all-products'>All Products</NavLink></li>
      </>}
      {role === "admin" || role === "manager"?
      <>
      <li><NavLink to='/add-new-product'>Add New Products</NavLink></li> 
      <li><NavLink to={`/dash-board`}>Dash Board</NavLink> </li>
      </>
      :""
      }
      </ul>
    </div>
  )
}

export default SmallNav