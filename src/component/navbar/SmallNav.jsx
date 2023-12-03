import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SmallNav = ({active}) => {
  const role = useSelector(state => state.data.login);

  return (
    <div>
           <ul className={`item-list ${active}`}>
      <li><NavLink to='/home'>Home</NavLink></li>
      <li><NavLink to='/all-products'>All Products</NavLink></li>
      {role !== "user"&&
      <>
      <li><NavLink to='/add-new-product'>Add New Products</NavLink></li> 
      <li><NavLink to={`/user/dash_board`}>Dash Board</NavLink> </li>
      </>
      }
      </ul>
    </div>
  )
}

export default SmallNav