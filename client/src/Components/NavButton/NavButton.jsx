import React from 'react'

import { Link } from 'react-router-dom';
import { soundEffects } from '../../SoundEffects/soundEffects';

import './NavButton.style.css'

const NavButton = ({ link }) => {

  return (
    <Link onClick={() => soundEffects.navButton.play()} className={`link nav-link ${link.border}`} to={link.to}>
        <p>
            {link.name}
        </p>
    </Link>
  )
}

export default NavButton