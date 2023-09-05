import { useEffect, useState } from "react"
import { randomCard } from "./helpers"
import { delay } from "./helpers"

export const useAiOpponent = (turn, playerCards, opponentCards, round, setRound, setTurn, setSequence, inSequence) => {
    const [playerToAttack, setPlayerToAttack] = useState(randomCard(playerCards))
    
    useEffect(() => {
        (async() => {
            if (turn === 1) {
                await delay(1500)
                const nonStunedCards = opponentCards.filter(card => 
                    (round - card.stunRound >= card.stunLength || !card.stunRound)
                )
                
                //chose a card if there are non stunned cards..else every card is stunned so can't attack and change the turn and increase the round 
                if (nonStunedCards.length) {
                    let random = randomCard(nonStunedCards)
                    opponentCards.forEach(card => {
                        if(card.id === nonStunedCards[random].id && !inSequence) {
                            if (card.skillCharge === card.skillCount && !card.sakuraSilence) {
                                setSequence({ turn, mode: "activeSkill", index: opponentCards.indexOf(card)})
                            } else {
                                setSequence({ turn, mode: "normalAttack", index: opponentCards.indexOf(card)})
                            }
                        } 
                    })
                } else {
                        setRound(round => round + 1);
                        setTurn(0)
                    }
    
                setPlayerToAttack(randomCard(playerCards))
            }
        })()
        // eslint-disable-next-line
    }, [turn, round])

    return {playerToAttack};
}