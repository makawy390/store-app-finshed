import {useState} from 'react'
// import { useSelector } from 'react-redux';
import  axios  from 'axios';
import url_books from '../../api/api.book';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid } from '@mui/material';
import { Button } from 'primereact/button';
// import '../css/form.css'
import  Swal  from 'sweetalert2';
import useTitle from '../../../changeDocTitle/docTitle';
const UpdateEmail = () => {
 const initialState = {
    email : undefined,
    password :undefined,
  };
  const [formData , setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
      const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  useTitle('update email | Store App ');

  // const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");
 const id = sessionStorage.getItem("id");

  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  };
//  const id = useSelector(state => state.data.id);
   const onSubmited = (e)=>{
        e.preventDefault();
        axios.patch(`${url_books}/api/user/updated/${id}`,{
            email : formData.email,
            password : formData.password, 
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
  title: response.data.data_en
});
            navigate(`/profile/${id}`);
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
    <div className='update'>
    <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
        <h1 className='text-center'>Welcome back</h1>
        <h6 className='text-center'>Updated To Data</h6>
        <form action={`/profile/${id}`} onSubmit={onSubmited} method='POST'>
    <TextField fullWidth   label="email" value={formData.email}
    type='email'  name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} />
    <TextField fullWidth label="password" value={formData.password}
     type="password" name="password" id="fullWidth" sx={{margin : '10px 0'}}
     onChange={handelChange}  />
     
<Button label="UPDATE"  icon="pi pi-check" loading={loading} /> 
        </form>
        </Grid>
    </Grid>

    </div>
  )
}

export default UpdateEmail