import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import { MenuItem } from '@mui/material';

const SelectCountry = () => {
  const[country , setCountry] = useState([]);
     useEffect(()=>{
        axios.get('https://restcountries.com/v2/all')
    .then(res => setCountry(res.data)).catch(err =>  err)
    },[])
  return (
    <div>
               {country.map(({name},id)=>(
              <MenuItem value={name} key={id}>{name}</MenuItem>
          ))}
    </div>
  )
}

export default SelectCountry;