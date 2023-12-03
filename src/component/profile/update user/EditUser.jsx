import axios from 'axios';
import {useEffect, useState} from 'react';
import url_books from '../../api/api.book';
// import {  useNavigate } from 'react-router-dom';
import { Box, TextField,FormControl
  ,RadioGroup,Radio,FormControlLabel
  , InputLabel , Select , MenuItem , Grid} from '@mui/material';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
// import { RadioButton } from 'primereact/radiobutton';
import Swal from 'sweetalert2';

const EditUser = () => {
  const initialState = {
    first_name : undefined,
    last_name : undefined,
    gender : undefined,
    country:undefined,
    description: undefined
  }
  const [formData , setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
 const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  };

 const id = useSelector(state => state.data.id);
  // const [image , setImage]=useState();
    const onSubmited = (e)=>{
        e.preventDefault();
        axios.patch(`${url_books}/api/user/update-profile/${id}`,{
            first_name : formData.first_name,
            last_name : formData.last_name,
             gender : formData.gender,
            country: formData.country,
            description: formData.description,
        },config).then((response)=> {
console.log(response);
  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: response.data.data_en
});

setFormData({
      first_name : "",
    last_name : "",
    gender : "",
    country: "",
    description: ""
})
 }).catch((error) =>{
            console.log(error.response);
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.response.data.message,
});
          });
          load();

    } 
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value});
      
    }
  const[country , setCountry] = useState([]);
    useEffect(()=>{
        axios.get('https://restcountries.com/v2/all')
    .then(res => setCountry(res.data)).catch(err =>  err)
    },[])

  return (
    <div className='edit-user'>
        <h1  className='text-center'>Edit Account</h1>
        <h6  className='text-center'>edit an account</h6>

    <form onSubmit={onSubmited} action={`/profile/${id}`} method='PATCH' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
  {/* <input type='file' onChange={(e)=> setImage(e.target.files[0])} /> */}
<Grid container spacing={2}  sx={{marginTop :.5}}>
  <Grid item md={6} xs={12}>
    <TextField fullWidth  placeholder="first name" type='text'  name="first_name"   
    onChange={handelChange} value={formData.first_name} />
  </Grid>
  <Grid item md={6} xs={12}>
        <TextField fullWidth  placeholder="last name" type='text'  name="last_name"  sx={{marginBottom : '10px'}} 
    onChange={handelChange} value={formData.last_name} />
  </Grid>
</Grid>
    {/* <TextField  placeholder="example@mail.com" type='email'  name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} value={formData.email}  /> */}
{/* <TextField value={formData.password}  placeholder="password" type="password" name="password"  sx={{margin : '10px 0'}}
     onChange={handelChange}  /> */}
    </Box>
 <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth sx={{margin : '10px 0'}}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='country'
          value={formData.country}
          label="Country"
          onChange={handelChange}
        >
          {country.map(({name},id)=>(
              <MenuItem value={name} key={id}>{name}</MenuItem>
          ))}
        </Select>
            <TextField fullWidth  placeholder="description" type='text'  name="description"   
    onChange={handelChange} value={formData.description} sx={{margin : '10px 0'}} />
                <RadioGroup row sx={{margin : '10px 0'}}
                aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" onChange={handelChange} />
        <FormControlLabel value="female" name='gender'  control={<Radio />} label="Female" onChange={handelChange} />
      </RadioGroup>
      </FormControl>
    </Box>

<Button label="updated"  icon="pi pi-check" loading={loading} /> 
    </form>
        {/* </Grid>
      </Grid> */}

    </div>
  )
}

export default EditUser;