import React from 'react'
import './NavButton.style.css'
import { Link } from 'react-router-dom';
import { soundEffects } from '../../SoundEffects/soundEffects';

const NavButton = ({ link }) => {

  return (
    <Link className={`link nav-link ${link.border}`} to={link.to}>
        <p onClick={() => soundEffects.buttonPress.play()}>
            {link.name}
        </p>
    </Link>
  )
}

export default NavButton