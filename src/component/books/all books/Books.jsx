import { Box ,CardActions, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import url from '../../api/api.book';
import '../css/books.css';
import useFetch from '../fetchData/fetch data/fetchData';
import { ProgressSpinner } from 'primereact/progressspinner';
// import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useState } from 'react';
import {Image} from 'primereact/image'
import  axios  from 'axios';
import  Swal  from 'sweetalert2';
import useTitle from '../../../changeDocTitle/docTitle';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
// import { addCart } from '../../../redux/reducer/createSliceProducts';

const Books = () => {
  // const role = useSelector(state => state.data.login);
  const role = sessionStorage.getItem("role")
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  // const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");

const deleteProduct = (product)=>{
 Swal.fire({
  title: "Are you sure?",
  text: `delete ${product.title}`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: `Your file has been deleted ${product.title}`,
      icon: "success"
    })
  axios.delete(`${url}/api/books/delete/${product._id}`,{
    headers:{
      Authorization : 'Bearer ' + token
    },
  }).then(res => res.data)
  .catch(err => console.log(err))
  }
});
}
// const addCart = (product)=>{
// sessionStorage.setItem("products" , [...product])
// }
  useTitle('All Products');
//  const dispath =  useDispatch();
  const booksData = useFetch(`${url}/api/books` , pageNum , 10);
  const filtrationBooks = booksData?.map((product)=>(
<Grid item lg={3} md={4} sm={6} xs={12}  key={product._id}>
      <CardContent>
        <Image src={product.image} alt="Image"  preview />

        <Typography margin='10px 0' variant="h6" component="h3">
          {product.title}
        </Typography>

       <div className="flex-state">
         <Typography variant="subtitle1"  color="text.secondary">
          {product.price} $
        </Typography> 
        {/* <HiOutlineShoppingCart onClick={dispath(addCart(product))}  /> */}
        <HiOutlineShoppingCart  />

       </div>
      </CardContent>
      <CardActions>
      <Stack spacing={1} direction="row">
               <Button label="View" severity="secondary" size="small"  
               raised onClick={()=> navigate(`/view/${product._id}`)} />
    {role === "admin" || role==="manager"? 
    <>
     <Button label="Delete" severity="danger" raised onClick={()=> deleteProduct(product) } />
     <Button label="Edit" raised onClick={()=> navigate(`/edite/${product._id}`)}/>
    </>  :  ''
  }
 </Stack>
      </CardActions>
    </Grid>
  ))
  return (
    <div className='books'>
      <h2>All Products</h2>
    <Box>
<Grid container spacing={2}  >
  {booksData === undefined? 
    <div className=" flex justify-content-center">
            <ProgressSpinner />
        </div> :   <>
        {filtrationBooks}
        </>
}
</Grid>
</Box>

<div className="pagination">
<Stack spacing={2} justifyContent='center' alignContent='center' alignItems='center'>
      <Pagination count={10} page={pageNum} onChange={handleChange}  color='primary'/>
    </Stack>
</div>
    </div>
  )
}

export default Books;