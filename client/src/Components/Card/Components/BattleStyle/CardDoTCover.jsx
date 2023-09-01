import React from 'react'
import { GiPoisonGas, GiBleedingWound, GiSmallFire } from 'react-icons/gi'

const CardDoTCover = ({ card }) => {
  return (
    <div className={`dot-effect-container`}>  
      {
        card?.action?.animation === "poison-dmg-take"
          ? <GiPoisonGas className={`dot-effect-poison`} />
          : null
      }     
      {
        card?.action?.animation === "bleed-dmg-take"
          ? <GiBleedingWound className={`dot-effect-bleed`} />
          : null
      }
      {
        card?.action?.animation === "burn-dmg-take"
          ? <GiSmallFire className={`dot-effect-burn`} />
          : null
      }       
    </div>
  )
}

export default CardDoTCover