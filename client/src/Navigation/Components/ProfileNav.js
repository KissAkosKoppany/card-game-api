import React from 'react'
import './ProfileNav.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from "js-cookie";

const ProfileNav = () => {

  const currentUser = useSelector((state) => state.rootReducer.user.currentUser)

  const deleteCookie = () => {
    Cookies.remove('user')
  }

  return (
    <nav className='profile-nav-dropdown'>
      <div className='profile-nav-decor line top'></div>
      <div className='profile-nav-decor line left'></div>
      <div className='profile-nav-decor line bottom'></div>
      <div className='profile-nav-decor line right'></div>
      <div className='profile-nav-decor triangle top'></div>
      <div className='profile-nav-decor triangle bottom'></div>
        {
          currentUser ? 
          <>
            <ul className='nav-group-container'>
              <li className='profile-nav'>Signed in as</li>
              <li className='profile-nav profile-nav-user-name'>{currentUser?.username}</li>
            </ul>
            <ul className='nav-group-container'>
              {
                currentUser?.admin === true
                  ? <Link to="admin-page" className='link'><li className='profile-nav-link'>Admin Page</li></Link>
                  : null
              }
              <Link className='link' to="user-info"><li className='profile-nav-link'>Profile info & battle statistics</li></Link>
            </ul>
            <ul className='nav-group-container'>
            <a onClick={deleteCookie} className='link' href='https://ec2-16-171-139-106.eu-north-1.compute.amazonaws.com:8000/api/auth/logout'><li className='profile-nav-link'>Sign Out</li></a>
            </ul>
          </>
          :
          <ul className='nav-group-container'>
            <a className='link' href='https://ec2-16-171-139-106.eu-north-1.compute.amazonaws.com:8000/api/auth/google'><li className='profile-nav-link'>Sing In</li></a>
          </ul>         
        }
    </nav>
  )
}

export default ProfileNav