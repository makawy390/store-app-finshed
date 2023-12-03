import axios from 'axios';
import {useState} from 'react'
import url_books from '../../api/api.book';
import { Link, useNavigate } from 'react-router-dom';
import '../css/form.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, TextField } from '@mui/material';
import {useDispatch} from 'react-redux'
import { Button } from 'primereact/button';
import { addData, addID, addProfile, addToken, checkFunc, newUsername } from '../../../redux/reducer/createSlice';
import  Swal  from 'sweetalert2';
import useTitle from '../../../changeDocTitle/docTitle';
const Login = () => {
      const initialState = {
    email : '' ,
    password: ''
  }
  const [formData , setFormData] = useState(initialState)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();    
    const load = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const onSubmitted = (e)=>{
        e.preventDefault();
        handleOpen();
    axios.post(`${url_books}/api/user/login` , {
        email: formData.email,
        password : formData.password
    })
    .then((res)=> {
        dispatch(addData(res.data.data.role));
        dispatch(addToken(res.data.token));
        dispatch(addID(res.data.data.id));
        console.log(res.data);
        dispatch(addProfile(res.data.data.profile));
        dispatch(newUsername(`${res.data.data.first_name} ${res.data.data.last_name}`))
        navigate('/all-products');
        dispatch(checkFunc());;
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
  title: res.data.data_en
});
    }).catch((err) =>{
      console.log(err.response.data.message);
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: err.response.data.message,
});
    });
    load();
    }
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }
  useTitle('Sign in');

    const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className='login'>
    <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
        <h1 className='text-center'>Welcome back</h1>
        <h6 className='text-center'>sign to continue</h6>

        <form action="/allBooks" onSubmit={onSubmitted} method='POST'>
    <TextField fullWidth id="outlined-basic" type='email' 
    value={formData.email} label="Email" variant="outlined" 
    name="email"  sx={{margin : '10px 0'}} onChange={handelChange} />

    <TextField fullWidth label="Password"  value={formData.password}
     type="password" name="password" id="outlined-basic" sx={{margin : '10px 0'}}
     onChange={handelChange}  />
     
<Button label="LOGIN"  icon="pi pi-check" loading={loading}/> 
 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
<div className='link'>
<p>Don't have account?</p><Link to='/register'>create new account</Link><br/>
</div>
        </form>
        </Grid>
    </Grid>

    </div>
  )
}

export default Login;
