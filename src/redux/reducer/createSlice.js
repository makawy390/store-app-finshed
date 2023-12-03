// import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { createSlice  } from "@reduxjs/toolkit";

// import api from '../../component/api/api.book'
// import { useSelector } from 'react-redux';
const initialState = {
    login : '',
    check : false,
    token: '',
    id : "",
    data : [],
    username : '',
    profile : ''
};

// export const fetchProduct = createAsyncThunk('productsSlice/fetchProduct' , async ()=>{
//     // const token =  useSelector(state => state.data.token)
   
//     const res = await fetch(`${api}/api/books`);
//     const data = await res.json();
//     return data;
// });
  
const dataSlice = createSlice({
    name: "login",
    initialState,
    reducers : {
        addData : (state , action) =>{
         state.login = action.payload;
        },
        addToken : (state , action) =>{
         state.token = action.payload;
        },
        addID : (state , action) =>{
         state.id = action.payload;
        },
        checkFunc : (state)=>{
            state.check = !state.check;
        },
        newUsername : (state , action) =>{
         state.username = action.payload;
        },
        addProfile : (state , action)=>{
            state.profile = action.payload;
        },
    },
    // extraReducers : (builder)=>{
    //     // builder.addCase(fetchProduct.pending , (state , action)=>{
    //     //     // show loader here
    //     // })
    //     builder.addCase(fetchProduct.fulfilled , (state , action)=>{
    //         // logic 
    //         console.log(action.payload);
    //         state.data.push(action.payload.data)
    //     })
    //     //  builder.addCase(fetchProduct.rejected , (state , action)=>{
    //     //     // show rejected here ==> error 
    //     // })
    // }

})

export const {addData , checkFunc , addToken , addID , newUsername , addProfile} = dataSlice.actions;
export default dataSlice.reducer;