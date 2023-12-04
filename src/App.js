import './App.css';
import { Route , Routes} from 'react-router-dom'
// import {useSelector } from 'react-redux';
import Layout from './component/layout/Layout.jsx';
import { lazy} from 'react'
const Home = lazy(() =>import('./component/page/Home.jsx'));
const Books = lazy(() =>import('./component/books/all books/Books.jsx'));
const AddBooks = lazy(() =>import('./component/books/add book/AddBooks.jsx'));
const ViewBook = lazy(() =>import('./component/books/view book/ViewBook.jsx'));
const EditeBook = lazy(() =>import('./component/books/update books/EditeBook.jsx'));
const Register = lazy(() =>import('./component/profile/register/Register.jsx'));
const Login = lazy(() =>import('./component/profile/login/Login.jsx'));
const Error = lazy(() =>import('./component/ErrorPage/Error.jsx'));
const Profile = lazy(() =>import('./component/profile/profile/Profile.jsx'));
const EditUser = lazy(() =>import('./component/profile/update user/EditUser.jsx'));
const DashBoard = lazy(() =>import('./component/dashboard/dash-board/DashBoard.jsx'));
const UpdateEmail = lazy(() =>import('./component/profile/update user/UpdateEmail.jsx'));
const ShoppingCartCart = lazy(() =>import('./component/books/shop-cart/ShoppingCart'));




function App() {
 const id = sessionStorage.getItem("id");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
            <Route index Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/all-products" Component={Books} />
            <Route path="/all-products/shop-cart" Component={ShoppingCartCart} />
            <Route path="view/:id" Component={ViewBook} />
            <Route path={`/profile/:${id}`} Component={Profile} />
            <Route path={`/edit/:${id}`} Component={EditUser} />  
            <Route path={`/updatedEmail/:${id}`} Component={UpdateEmail} />
            <Route path="/register" Component={Register} />
            <Route path="/add-new-product" Component={AddBooks} />
            <Route path="/edite/:id" Component={EditeBook} />
            <Route path="/dash-board" Component={DashBoard} />
            <Route path="*" Component={Error} />
      </Route>
    </Routes>

  );
}

export default App;
