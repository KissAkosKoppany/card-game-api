import React from 'react';

import NavButton from '../NavButton/NavButton';

import './SecondaryNav.style.css';

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