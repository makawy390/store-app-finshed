import axios from 'axios';
import {useState , useEffect, useRef} from 'react';
import { useParams} from 'react-router-dom'
import url_books from '../../api/api.book';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Grid } from '@mui/material';
import { Image } from 'primereact/image';
import useTitle from '../../../changeDocTitle/docTitle';

const ViewBook = () => {
    const {id} = useParams();
    const toast = useRef(null);
    const [singleBook , setSingleBook] = useState([]);
    useEffect(()=>{
      axios.get(`${url_books}/api/books/view/${id}`)
      .then((res)=> setSingleBook(res.data.data))
      .catch((err)=> console.error(err));
    },[id]);
    console.log(singleBook);
    const [loading, setLoading] = useState(false);

    const save = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'product is Buy' });
        }, 1000);
    };
  useTitle('View Product');

  return (
    <div className='view' dir='ltr'>
            <Grid container>
              <Grid item lg={3} md={4} xs={12}>
        <Image src={singleBook.image} alt="Image"   preview />
              </Grid>
  <Grid item lg={6} md={8} xs={12}>
    <div className="card-view">
            <h2>  {singleBook.title}</h2>
      <p>  {singleBook.description} </p>
      <p>  {singleBook.price} $ </p>
      {/* <Link to={singleBook.link} target='_blank'>Link Book</Link> <br /> */}
            <Toast ref={toast}></Toast>
            <Button label="Buy" icon="pi pi-plus" onClick={save}  loading={loading}  />
    </div>
  </Grid>
</Grid>
    </div>
  )
}
export default ViewBook;