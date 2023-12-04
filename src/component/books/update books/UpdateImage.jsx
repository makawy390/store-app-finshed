import {useRef, useState} from 'react'
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import url_books from '../../api/api.book';
import  Swal  from 'sweetalert2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import img from '../../assets/add-files.svg'
import { MdOutlineBrowserUpdated } from 'react-icons/md';

const UpdateImage = () => {
    const [image , setImage]=useState("");
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

      // const token = useSelector(state => state.data.token)
      const token = sessionStorage.getItem("token");
 let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  };
    const {id} = useParams();
const   navigate = useNavigate();
  const handelImage = (e)=>{
    e.preventDefault();
    handleOpen();
    const formDataFile = new FormData();
    formDataFile.append('image',image);
    axios.patch(`${url_books}/api/books/update-image/${id}` , {
        image : image
    },config).then((res) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/all-products');
          console.log(res.data);
    }).catch(err => {
      handleClose();
      console.error(err)})
  };
    const handelImageClick = ()=>{
    inputRef.current.click();
  }
  
  return (
    <div className='file-product-update'>
      {image? <img src={URL.createObjectURL(image)} alt='' onClick={handelImageClick}/> : <img src={img} alt='...' onClick={handelImageClick}/>}
  <input type='file' onChange={(e)=> setImage(e.target.files[0])}  ref={inputRef} style={{display :'none'}}/>
{/* <Button label="Upload"  icon="pi pi-check" onClick={handelImage} loading={loading} />  */}
<MdOutlineBrowserUpdated  onClick={handelImage}/>
  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default UpdateImage