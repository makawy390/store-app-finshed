import  { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import '../css/dash-board.css'
import axios from 'axios';
// import { useSelector } from 'react-redux';
import CustomizedTables from '../tabel/Tabel';
import api from '../../api/api.book'
import { Grid } from '@mui/material';
import useTitle from '../../../changeDocTitle/docTitle';
export default function DashBoard() {
    const [users , setUsers] = useState([]);
    //  const token = useSelector(state => state.data.token);
     const token = sessionStorage.getItem("token");
//   let config = 

    const arr = [];
    useEffect(() => {
        axios.get(`${api}/api/user?limit=100&page=1` , {
    headers: {
      'Authorization':`Bearer ${token}`
    }
  }  )
     .then(res => setUsers(res.data.data.allUsers))
     .catch(err => console.log(err))
    });

users.filter(ele => ele.role? arr.push(ele.role) : '')
const arrUser = [];
const arrManager = [];
const arrAdmin = [];


arr.filter(ele => ele === "user"? arrUser.push(ele): ele === "manager"?
 arrManager.push(ele) : ele === "admin"? arrAdmin.push(ele) : '')
// console.log(arrUser , arrManager , arrAdmin);
  useTitle('Dash Board');


    return (
        <div className="dash-board">
            <>
              <PieChart 
      series={[
        {
          data: [
            { id: 0, value: `${arrUser.length}`, label: 'user' },
            { id: 1, value: `${arrAdmin.length}`, label: 'admin' },
            { id: 2, value: `${arrManager.length}`, label: 'manager' },

          ],
        },
      ]}
      width={400}
      height={200}
    />
            </>
                <Grid container spacing={2} sx={{margin: "20px 0"}}>
      <Grid item md={4} xs={12}>
        <div className="box-card">
          <div className="card-dash one">
        <h5>count of user</h5>
        <span>{arrUser.length}</span>
          </div>
        </div>

      </Grid>
            <Grid item md={4} xs={12}>
                      <div className="box-card ">
          <div className="card-dash two">
        <h5>count of admin</h5>
        <span>{arrAdmin.length}</span>
        </div></div>
      </Grid>
            <Grid item md={4} xs={12}>
            <div className="box-card">
          <div className="card-dash three">
        <h5>count of manager</h5>
        <span>{arrManager.length}</span>
        </div></div>
      </Grid>
      
    </Grid>
    <CustomizedTables /> 

        </div>
    )
}