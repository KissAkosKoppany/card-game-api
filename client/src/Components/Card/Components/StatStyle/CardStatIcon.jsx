import React from 'react';
import { GiBroadsword, GiLunarWand, GiHearts, GiMagicShield, GiStrikingSplinter, GiClout, GiAbdominalArmor } from 'react-icons/gi';

const CardStatIcon = ({ statName }) => {
  return (
    <>
        { statName === "ad" ? <GiBroadsword className='card-stat-icon' /> : null }
        { statName === "ap" ? <GiLunarWand className='card-stat-icon' /> : null }
        { statName === "hp" ? <GiHearts className='card-stat-icon' /> : null }
        { statName === "magicResist" ? <GiMagicShield className='card-stat-icon' /> : null }
        { statName === "armor" ? <GiAbdominalArmor className='card-stat-icon' /> : null }
        { statName === "critRate" ? <GiStrikingSplinter className='card-stat-icon' /> : null }
        { statName === "critDamage" ? <GiClout className='card-stat-icon' /> : null }
    </>
  )
}

export default CardStatIcon