import React from 'react'
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
 const cart = useSelector(state => state.data.cart);
 console.log(cart);
  return (
    <div>ShoppingCart</div>
  )
}

export default ShoppingCart