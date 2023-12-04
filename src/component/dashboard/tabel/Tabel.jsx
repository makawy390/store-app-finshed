import * as React from 'react';
import  { tableCellClasses , Table , styled,  TableBody  
  , TableRow  , TableCell,TableContainer , TableHead} from '@mui/material';
import axios  from 'axios';
// import { useSelector } from 'react-redux';
import api from '../../api/api.book';
import {Image} from 'primereact/image';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables(data) {
    const [user , setUser] = React.useState([]);

    //  const token = useSelector(state => state.data.token);
     const token = sessionStorage.getItem("token")
     let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
    React.useEffect(()=>{
     axios.get(`${api}/api/user` , config)
     .then(res => setUser(res.data.data.allUsers))
     .catch(err => console.log(err))
    });

  return (
<div className="tabel">
      <TableContainer>
      <Table sx={{ width : "100%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>full name</StyledTableCell>
            <StyledTableCell>email</StyledTableCell>
            <StyledTableCell>country</StyledTableCell>
            <StyledTableCell>gender</StyledTableCell>
            <StyledTableCell>role</StyledTableCell>
            <StyledTableCell>profile</StyledTableCell>
            {/* <StyledTableCell>operation</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell>
                {user.first_name} {user.last_name}
              </StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.country}</StyledTableCell>
              <StyledTableCell>{user.gender}</StyledTableCell>
              <StyledTableCell>{user.role}</StyledTableCell>
            <StyledTableCell>
              <Image src={user.profile} alt="Image" width="250" />
            </StyledTableCell>
              {/* <StyledTableCell align='center'> <MdDelete /> </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
</div>
  );
}