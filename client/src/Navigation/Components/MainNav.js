import React, { useState } from 'react';
import "./MainNav.css";
import { GiSamuraiHelmet } from 'react-icons/gi'
import { IoMdArrowDropdown } from 'react-icons/io'
import ProfileNav from './ProfileNav';
import NavButton from '../../Components/NavButton/NavButton'
import { useSelector } from 'react-redux';


const MainNav = ({ battleMode }) => {

  const [isOpen, setIsOpen] = useState(false)
  const currentUser = useSelector((state) => state.rootReducer.user.currentUser)

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  const links = [
    {
      to: "",
      name: "Home",
      border: ""
    },
    {
      to: "fight/story-mode",
      name: "Fight",
      border: ""
    },
    {
      to: "cards",
      name: "Cards",
      border: ""
    },
    {
      to: "leaderboard",
      name: "Leader Board",
      border: ""
    }
  ]

  return (
    <nav className={`main-nav ${battleMode ? "battle-mode" : ""}`}>
        {
          links.map((link, i) => (
            <NavButton key={i} link={link} />
          ))
        }
        <div  onMouseEnter={() => toggleDropdown()} onMouseLeave={() => toggleDropdown()}  className='dropdown-container'>
          <p className={`profile-info-button ${currentUser ? "logged-in" : ""}`}><GiSamuraiHelmet /><IoMdArrowDropdown className='nav-button-arrow' /></p>
          { isOpen ? <ProfileNav /> : null}
        </div>
    </nav>
  )
}

export default MainNav;