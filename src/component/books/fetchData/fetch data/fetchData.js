import axios from "axios";
import { useState , useEffect } from "react";
// import { useSelector } from 'react-redux';
  
const useFetch = (url , page , limit)=>{
    
//  const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");
  // let config = {
  //   headers: {
  //     'Authorization': 'Bearer ' + token
  //   }
  // }  
    const [data,setData] = useState(undefined);
    
    useEffect(() => {
        axios.get(`${url}?limit=${limit}&page=${page}` ,{ 
        headers: {
      'Authorization': `Bearer ${token}`
      
    }
  }).then((res)=> {
            setData(res.data.data)
        })
        .catch((err)=> console.log(err))
    });
     return data;
}

export default useFetch;