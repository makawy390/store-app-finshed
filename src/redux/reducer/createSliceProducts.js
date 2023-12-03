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
         const {title} = action.payload;
         const item = state.cart.findIndex(cart => cart.title === title);
          if (item >=0) {
            state.cart[item].count +=1
        }   
        else {
            const finalCart = action.payload
            state.cart.push(finalCart)
            state.count +=1;
        }
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