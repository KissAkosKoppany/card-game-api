import React from 'react'

import { Outlet } from 'react-router-dom';

import MainNav from '../Components/MainNav';

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