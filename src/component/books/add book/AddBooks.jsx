import {  Grid, TextField  ,  InputAdornment , OutlinedInput } from '@mui/material';
import axios from 'axios';
import {useRef, useState} from 'react'
import url_books from '../../api/api.book';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Button} from 'primereact/button'
import img from '../../assets/add-files.svg';
import useTitle from '../../../changeDocTitle/docTitle';

const AddBooks = () => {
  const initialState = {
    title : '',
    description: '',
    price : 0
  };
  useTitle('Add Product');  
  const [bookData , setBookData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  // const token = useSelector(state => state.data.token)
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [image , setImage]=useState();
  const data = {
      title : bookData.title,
      description :  bookData.description,
      price :  bookData.price,
      image : image
    };
     let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  }
   const onSubmited = (e)=>{
    e.preventDefault();
    const formDataFile = new FormData();
    formDataFile.append('image',image);
    load();
    axios.post(`${url_books}/api/books/add` ,data ,config)
    .then((response)=> {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/allBooks');
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });    
  };
      const handelChange = (e)=>{
      setBookData({...bookData , [e.target.name] : e.target.value})
    }
      const inputRef = useRef();
      const handelImageClick = (e)=>{
    inputRef.current.click();
  }
  const onChangeImage = (e)=>{
setImage(e.target.files[0])
  }
  return ( 
    <div className='add-new'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={6} lg={5}>
        <h2 className='text-center'>Add Product</h2>
        <h6 className='text-center'>add new product</h6>
    <form action='/allBooks' method='POST'>
      <div className='files-product'>
      {image? <img src={URL.createObjectURL(image)} className='image-uploads' alt='' onClick={handelImageClick}/> :
       <img src={img} alt='...' onClick={handelImageClick} />}
  <input type='file' style={{display :'none'}} onChange={onChangeImage} ref={inputRef}  />
    </div>
    <TextField fullWidth label="nam a product" id="fullWidth" name='title'
     sx={{margin : '10px 0'}} onChange={handelChange} />
    <TextField fullWidth label="description" id="fullWidth" sx={{margin : '10px 0'}} name='description'
     onChange={handelChange}  />
    
          <OutlinedInput fullWidth
            id="standard-adornment-amount" label='price' name='price' onChange={handelChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
    <Button label="add new product"  icon="pi pi-check" loading={loading} onClick={onSubmited}/>
    </form>
        </Grid>
      </Grid>
    </div>
  )
}
export default AddBooks;