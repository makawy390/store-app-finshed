import {useRef, useState} from 'react'
// import { useSelector } from 'react-redux';
import  axios  from 'axios';
import url_books from '../../api/api.book';
import  Swal  from 'sweetalert2';
import { Button } from 'primereact/button';
import { RiUploadCloud2Line } from "react-icons/ri";
const UpdateImageProfile = () => {
  const [image , setImage]=useState();
//  const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  };
  const [nameImage , setNameImage] = useState('image name');
const onChangeImage = (e)=>{
setImage(e.target.files[0]);
setNameImage(e.target.files[0].name);
};
const [loading, setLoading] = useState(false);
const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  const inputRef = useRef();
//  const id = useSelector(state => state.data.id);
 const id = sessionStorage.getItem("id")

  const updateProfile = (e)=>{
e.preventDefault();
load();
        const formDataFile = new FormData();
        formDataFile.append('image',image);
        axios.patch(`${url_books}/api/user/update-image-profile/${id}`,{
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
  title: "Updated is Success"
});
  setNameImage("image name")
           console.log(response);
          }).catch((error) =>{
          });
    };
  const handelImageClick = ()=>{
    inputRef.current.click();
  }
  
  return (
    <div className='files'>
      <div className='input-file'>{nameImage}</div>
      <RiUploadCloud2Line className='icons-select'  onClick={handelImageClick}/>

  <input type='file' onChange={(e)=> onChangeImage(e)} ref={inputRef} style={{display :'none'}} />
<Button label="Upload"  icon="pi pi-check" onClick={updateProfile} loading={loading} /> 

    </div>
  )
}

export default UpdateImageProfile