import React from 'react'
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
 const cart = useSelector(state => state.cart.cart);
 console.log(cart);
  return (
    <div>ShoppingCart</div>
  )
}
export default ShoppingCart