import React from 'react';
import { GiGhost, GiMute, GiPoisonGas, GiUpgrade, GiClout, GiBroadsword, GiHealing, GiLunarWand, GiMagicShield, GiAbdominalArmor, GiBleedingWound, GiSmallFire } from 'react-icons/gi'

const CardEffectIconsBar = ({ card }) => {
  return (
    <div className='effect-icons-container'>
        { //fear
            card.Luffyfear === true || card.titanFear === true
                ? <div className="effect-icon"><GiGhost /></div>
                : null
        }
        { //silence
            card.sakuraSilence === true || card.ryukSilence === true
                ? <div className="effect-icon"><GiMute className='icon-silence' /></div>
                : null
        }
        { //poison
            card.kanekiPoison === true || card.saikenPoison === true || card.zerefPoison === true
                ? <div className="effect-icon"><GiPoisonGas className='icon-poison' /></div>
                : null
        }
        { //crtit buff
            card.ayanokoujiBuff === true || card.gintokiBuff === true || card.misaBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon' /><GiClout className='icon-crit' /></div>
                : null
        }
        { //crit deBuff
            card.sakamotoDeBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon down' /><GiClout className='icon-crit' /></div>
                : null
        }
        { //attackBuff
            card.erwinBuff === true || card.gintokiBuff === true || card.haruhimeBuff === true || card.ichiyaBuff === true || card.misaBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon' />
                    {
                        card.damageType === "ad"
                            ? <GiBroadsword className='icon-attack-ad' />
                            : <GiLunarWand className='icon-attack-ap' />
                    }
                  </div>
                : null
        }
        { //attack deBuff
            card.sakamotoDeBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon down' />
                    {
                        card.damageType === "ad"
                            ? <GiBroadsword className='icon-attack-ad' />
                            : <GiLunarWand className='icon-attack-ap' />
                    }
                  </div>
                : null
        }
        { //bleed
            card.yunoBleed === true || card.titanBleed === true
                ? <div className="effect-icon"><GiBleedingWound className='icon-bleed' /></div>
                : null
        }
        { //armor debuff
            card.gintokiBuff === true || card.subaruDeBuff === true || card.isobuDeBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon down' /><GiAbdominalArmor className='icon-armor' /></div>
                : null
        }
        { //magicResist debuff
            card.gintokiBuff === true || card.subaruDeBuff === true || card.isobuDeBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon down' /><GiMagicShield className='icon-magicResist' /></div>
                : null
        }
        { //armor buff
            card.orihimeBuff === true || card.haruhimeBuff === true || card.naofumiBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon' /><GiAbdominalArmor className='icon-armor' /></div>
                : null
        }
        { //magicResist buff
            card.orihimeBuff === true || card.haruhimeBuff === true || card.naofumiBuff === true
                ? <div className="effect-icon"><GiUpgrade className='effect-sub-icon' /><GiMagicShield className='icon-magicResist' /></div>
                : null
        }
        { //burn
            card.kuramaBurn === true
                ? <div className="effect-icon"><GiSmallFire className='icon-burn' /></div>
                : null
        }
        { //heal
            card.asunaHeal === true || card.kanekiBuff === true
                ? <div className="effect-icon"><GiHealing className='icon-heal' /></div>
                : null
        }
    </div>
  )
}

export default CardEffectIconsBar