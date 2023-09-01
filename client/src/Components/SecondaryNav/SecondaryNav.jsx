import React from 'react';
import './SecondaryNav.style.css';
import NavButton from '../NavButton/NavButton';

const SecondaryNav = ({ links, battleMode }) => {

    return (
        <div className={`fight-nav ${battleMode ? "battle-mode" : ""}`}>
            {
                links.map((link, i) => (
                    <NavButton key={i} link={link} />
                ))
            }       
        </div>
    )
}

export default SecondaryNav;