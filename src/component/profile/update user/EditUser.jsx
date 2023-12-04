import axios from 'axios';
import {useState} from 'react';
import url_books from '../../api/api.book';
// import {  useNavigate } from 'react-router-dom';
import { Box, TextField,RadioGroup,Radio,FormControlLabel, Grid} from '@mui/material';
import { Button } from 'primereact/button';
// import { useSelector } from 'react-redux';
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
//  const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  };

//  const id = useSelector(state => state.data.id);
 const id = sessionStorage.getItem("id");
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

  return (
    <div className='edit-user'>
        <h1  className='text-center'>Edit Account</h1>
        <h6  className='text-center'>edit an account</h6>

    <form onSubmit={onSubmited} action={`/profile/${id}`} method='PATCH' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
<Grid container spacing={2}  sx={{marginTop :.5}}>
  <Grid item md={6} xs={12}>
    <TextField fullWidth  label="first name" type='text'  name="first_name"   
    onChange={handelChange}  />
  </Grid>
  <Grid item md={6} xs={12}>
        <TextField fullWidth  label="last name" type='text'  name="last_name"  sx={{marginBottom : '10px'}} 
    onChange={handelChange}  />
  </Grid>
</Grid>
            <TextField fullWidth  label="address" type='text'  name="country"   
    onChange={handelChange}  sx={{margin : '10px 0'}} />
            <TextField fullWidth  label="Bio" type='text'  name="description"   
    onChange={handelChange}  sx={{margin : '10px 0'}} />
                <RadioGroup row sx={{margin : '10px 0'}}
                aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" onChange={handelChange} />
        <FormControlLabel value="female" name='gender'  control={<Radio />} label="Female" onChange={handelChange} />
      </RadioGroup>

    </Box>
<Button label="updated"  icon="pi pi-check" loading={loading} /> 
    </form>

    </div>
  )
}

export default EditUser;