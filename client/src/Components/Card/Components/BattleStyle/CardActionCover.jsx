import React from 'react'
import { GiPadlock, GiClout, GiHealing, GiPunchBlast, GiSteamBlast } from 'react-icons/gi'

const CardActionCover = ({ card, round }) => {

  return (
    <div className={`card-action-cover ${round - card?.stunRound < card?.stunLength ? "onStun" : ""} ${card?.action?.name}`}>
        <div className={`card-action-cover-bg ${round - card?.stunRound < card?.stunLength ? "onStun" : ""} ${card?.action?.name}`}></div>
        <div className={`card-action-container ${round - card?.stunRound < card?.stunLength ? "onStun" : ""} ${card?.action?.name}`}>
            <div className={`card-action-container-border ${card?.theme}`}></div>
            <GiPadlock className={`card-action-icon ${round - card?.stunRound < card?.stunLength ? "onStun" : ""} ${card?.action?.name}`} />
            <p className={`card-action-text ${round - card?.stunRound < card?.stunLength ? "onStun" : ""} ${card?.action?.name} ${card?.action?.type} ${card?.action?.attackType}`}>
                { card?.action?.type === "heal" ? "+" : "-"}
                { card?.action?.value }
                { card?.action?.attackType === "ad" ? <GiPunchBlast /> : null}
                { card?.action?.attackType === "ap" ? <GiSteamBlast /> : null}
                { card?.action?.type === "critAttack" ? <GiClout /> : null}
                { card?.action?.type === "heal" ? <GiHealing /> : null}
            </p>
        </div>
    </div>
  )
}

export default CardActionCover