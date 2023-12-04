import { Grid, TextField, OutlinedInput, InputAdornment } from '@mui/material';
import {useState} from 'react';
import url_books from '../../api/api.book';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
// import { useSelector } from 'react-redux';
import UpdateImage from './UpdateImage';
import useTitle from '../../../changeDocTitle/docTitle';
const EditeBook = () => {
    const param = useParams();   
    const [name , setName] = useState();
    const [desc , setDesc] = useState();
    const [price , setprice] = useState();
    const [loading, setLoading] = useState(false);
  const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  // const token = useSelector(state => state.data.token)
  const token = sessionStorage.getItem("token");
 let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  }
const  navigate = useNavigate();
const handlerEdit = (e)=>{
    e.preventDefault();
    load();
    axios.patch(`${url_books}/api/books/update/${param.id}` , {
        title : name,
        description: desc,
        price : price,
    },config).then((res) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          // console.log(res.data);
          navigate('/all-products');
    })
    .catch(err => console.error(err))
}
  useTitle('Update Product');

  return (
    <div className='edit'>
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs={12} md={5}>
      <h2 className='text-center'>Update a Product</h2>
      <h6 className='text-center'>update a product</h6>
    <form>
      <UpdateImage />
    <TextField fullWidth   label="name a product" id="fullWidth" sx={{margin : '10px 0'}} 
    onChange={(e) => setName(e.target.value)} 
     />
    <TextField fullWidth   label="description" id="fullWidth" sx={{margin : '10px 0'}}
    onChange={(e) => setDesc(e.target.value)} />

              <OutlinedInput fullWidth
            id="standard-adornment-amount" label='price' onChange={(e)=> setprice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
    <Button label="update"  icon="pi pi-check" loading={loading} onClick={handlerEdit}/>
    </form>
      </Grid>
    </Grid>
    </div>
  )
}

export default EditeBook;
