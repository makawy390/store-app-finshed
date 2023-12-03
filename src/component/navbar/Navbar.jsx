import { NavLink, useNavigate } from 'react-router-dom';
import './nav.css';
import {useSelector , useDispatch } from 'react-redux';
import { checkFunc } from '../../redux/reducer/createSlice';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiHeartDuotone } from "react-icons/pi";
import Menu from '@mui/material/Menu';
import { BiMenu } from "react-icons/bi";
import { Stack, Avatar, MenuItem } from '@mui/material';
import { useState } from 'react';
import SmallNav from './SmallNav';

const Navbar = () => {
  const check = useSelector(state => state.data.check);
  const id = useSelector(state => state.data.id);
  const profile = useSelector(state => state.data.profile);
console.log(profile);
const dispatch = useDispatch();
const navi = useNavigate();
// console.log(role);
  const [nav , setNav] = useState(false);

  const handelNavigationBar = ()=>{
    if (nav === true) {
      setNav('')
    }
    else{
      setNav(true)
    }
  }
    const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const handelLogout = ()=>{
  setAnchorEl(null);
  dispatch(checkFunc())
  navi('/')
}
const handelProfile = ()=>{
  setAnchorEl(null);
  navi(`/profile/${id}`);
}
  return (
<>
<div className="nav-bar">
      <div className="nav">
    <div className="list-style">
      <div className="logo">
        <h4>app store</h4>
      </div>
      <SmallNav active={nav=== true? '' : 'active'} />
      {/* list */}
      <ul className="list">
        <li></li>
      </ul>
      {/* item  */}
      <ul className="item">    
    {check === true?
          <>
             <Stack direction="row" sx={{paddingTop: '20px'}}>
      <Avatar alt="Remy Sharp" src={profile} id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} />
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handelProfile}>Profile</MenuItem>
        <MenuItem onClick={()=> navi('/all-products/shop-cart')}><HiOutlineShoppingCart onClick={()=> navi('/all-products/shop-cart')} /></MenuItem>
        <MenuItem onClick={handelLogout}><PiHeartDuotone /></MenuItem>
        <MenuItem onClick={handelLogout}>Logout</MenuItem>

      </Menu>
    </Stack>
    </>
    : <li><NavLink to='/' >login</NavLink></li>
  }     

      </ul>
  <BiMenu onClick={()=> handelNavigationBar()} />
    </div>
      </div>
    </div>
</>
  )
}

export default Navbar;