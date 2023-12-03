import axios from 'axios';
import {useRef, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import url_books from '../../api/api.book';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField , Grid } from '@mui/material';
import '../css/form.css';
import { Button } from 'primereact/button';
import  Swal  from 'sweetalert2';
import img from '../../assets/add-files.svg';
import useTitle from '../../../changeDocTitle/docTitle';

const Register = () => {
  const initialState = {
    first_name : '',
    last_name : '',
    email : '' ,
    password: '',
    gender : '',
    country: '',
    description: '',
  }
  const [formData , setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  const [image , setImage]=useState();

    const onSubmited = (e)=>{
        handleOpen();
        e.preventDefault();
        const formDataFile = new FormData();
        formDataFile.append('image',image);
        load();
        axios.post(`${url_books}/api/user/register`,{
            first_name : formData.first_name,
            last_name : formData.last_name,
            email : formData.email,
            password : formData.password,
             gender : formData.gender,
            country: formData.country,
            description: 'Welcome To Books App',
            profile : image
        },config).then((response)=> {
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
  title: response.data.data
});
navigate('/');
}).catch((error) =>{
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Error Message",
});
handleClose();
// console.log(error.response);
          });
    } 
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }
    
  useTitle('Sign up ');
    
  const inputRef = useRef();
      const handelImageClick = (e)=>{
    inputRef.current.click();
  }
  const onChangeImage = (e)=>{
setImage(e.target.files[0])
  }
  
    const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className='register'>
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12} md={6}>
        <h1  className='text-center'>Create Account</h1>
        <h6  className='text-center'>create a new account</h6>

    <form onSubmit={onSubmited} action='/' method='POST' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
    <div className='files-register'>
      {image? <img src={URL.createObjectURL(image)} className='image-uploads' alt='' onClick={handelImageClick}/> :
       <img src={img} alt='...' onClick={handelImageClick} />}
  <input type='file' style={{display :'none'}} onChange={onChangeImage} ref={inputRef}  />

    </div>

<Grid container spacing={1}>
  <Grid item md={6} xs={12}>
    <TextField    label="first name" type='text'  name="first_name"  sx={{margin : '20px 0 0 0'}} 
    onChange={handelChange} value={formData.first_name} fullWidth />
  </Grid>
  <Grid item md={6} xs={12}>
        <TextField  label="last name" type='text'  name="last_name" sx={{margin : '20px 0 0 0'}}   
    onChange={handelChange} value={formData.last_name} fullWidth />
  </Grid>
</Grid>

    <TextField  label="email" type='email'  name="email"  sx={{margin : '10px 0 0 0px'}} 
    onChange={handelChange} value={formData.email} />
<TextField value={formData.password}  label="password" type="password" name="password"  sx={{margin : '10px 0'}}
     onChange={handelChange}  />
     <TextField value={formData.country}  label="Address"  name="country"  sx={{margin : '10px 0'}}
     onChange={handelChange}  />
     
    </Box>
<Button label="Create Account"  icon="pi pi-check" loading={loading} /> 
 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <p> Already have a account? </p><Link to='/'>Login </Link><br/>

    </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Register