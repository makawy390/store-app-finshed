import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
import url_books from '../../api/api.book';
import  axios from 'axios';
import '../css/profile.css'
import {Grid} from '@mui/material';
import {Image} from 'primereact/image'
import EditUser from './../update user/EditUser';
import { Link } from 'react-router-dom';
import UpdateImageProfile from './UpdateImageProfile';
import useTitle from '../../../changeDocTitle/docTitle';
const Profile = () => {
 const [profile , setProfile] = useState([]);
//  const id = useSelector(state => state.data.id);
 const id = sessionStorage.getItem("id")
//  const token = useSelector(state => state.data.token);
 const token = sessionStorage.getItem("token");
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  useTitle('Profile '); 
  axios.get(`${url_books}/api/user/view/${id}` , config)
 .then(res => setProfile(res.data.data))
 .catch(error => console.log(error)); 
  return (
    <div className='profile' >
      <div className="div">
              <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <div className='update-image'>
        <Image src={profile.profile} alt="Image"  preview />
      <UpdateImageProfile />
          </div>
           <h3>{profile.first_name} {profile.last_name}</h3>
     <h6>{profile.role}</h6>
     <h6>{profile.country}</h6>
     <hr />
     <span>Bio</span>
     <h6>{profile.description} </h6>
     <Link to={`/updatedEmail/${id}`}>Update Email</Link>

        </Grid>
        <Grid item md={6} xs={12}>
          <EditUser/>
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default Profile