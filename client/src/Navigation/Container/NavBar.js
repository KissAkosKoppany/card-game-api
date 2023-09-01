import React from 'react'
import MainNav from '../Components/MainNav';
import { Outlet } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ battleMode }) => {
  return (
    <div className={`nav-bar`}>
        <MainNav battleMode={battleMode} />
        <Outlet />
    </div>
  )
}

export default NavBar;