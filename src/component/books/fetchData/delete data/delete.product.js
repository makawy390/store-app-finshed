import axios from "axios";
import url_books from "../../../api/api.book";
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

 const delete_product = (book, data) => {
   Swal.fire({
    titleText: `Are You Sure to Delete Book ${data.title}`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
  const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  };
      axios.delete(`${url_books}/api/books/delete/${data._id}`, config)
        .then((res) => {
          console.log(res);
          return book;
        }).catch((err) => console.error(err));
    }
  });
};
export default delete_product;