import { createSlice  } from "@reduxjs/toolkit";
const initialState = {
 cart : [],
 count : 0
};
const cartSlice = createSlice({
    name: "products",
    initialState,
    reducers : {
        addCart : (state , action)=>{
         const id = action.payload.id;
         state.count =+1;
         const cartItem = state.cart.find(cart => cart._id === id);
         cartItem ? (cartItem.count  =+1) : state.cart.push({...action.payload , count : 1})
        },
        deleteCart : (state , action)=>{
            state.cart = state.cart.filter((item) => item.id !== action.payload)
            state.count -= 1;
        },
         clearCart : (state)=>{
            state.cart = [];
            state.count = 0;
        }
    },
})

export const {addCart , deleteCart , clearCart} = cartSlice.actions;
export default cartSlice.reducer;