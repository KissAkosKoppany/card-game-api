import { useEffect, useState } from "react"
import { delay, playerChoice } from "./helpers"
import { useAiOpponent } from "./useAiOpponent"
import { soundEffects } from "../../../../SoundEffects/soundEffects"
import { damageValue, handleHp, handleDamageReceived, skillChargeUpdate, skillChargeUpdateAtRoundEnd, checkCardDeath, updateSkillCharge } from "../BattleFunctions/battleFunctionHelpers"
import { activeSkills } from "../BattleFunctions/activeSkills"
import { effectsHandler } from "../BattleFunctions/effectsHandler"
import { activeSkillBoss } from "../BattleFunctions/activeSkillBoss"

import { useSelector } from "react-redux"
import { useBattleEndHandlerStoryMode } from "./useBattleEndHandler"

export const useBattleSequence = (userId, setBattleMode) => {


    const playerBattleCards = useSelector((state) => state.rootReducer.cards.playerBattleCards)
    const opponentBattleCards = useSelector((state) => state.rootReducer.cards.opponentBattleCards)

    const [sequence, setSequence] = useState({})
    const [turn, setTurn] = useState(0)
    const [inSequence, setInSequence] = useState(false)
    const [monsterCards, setMonsterCards] = useState(opponentBattleCards)
    const [playerCards, setPlayerCards] = useState(playerBattleCards)
    const [round, setRound] = useState(1)
    const [playerEffects, setPlayerEffects] = useState({})
    const [opponentEffects, setOpponentEffects] = useState({})
    const [playerAnimation, setPlayerAnimation] = useState({
        state: false,
        id: 0,
        name: ""
    })
    const [opponentAnimation, setOpponentAnimation] = useState({
        state: false,
        id: 0,
        name: ""
    })

    const { playerToAttack } = useAiOpponent(turn, playerCards, monsterCards, round, setRound, setTurn, setSequence, inSequence)

    useBattleEndHandlerStoryMode(playerCards, monsterCards, userId, setBattleMode)

    useEffect(() => {
        //checks for crowd control and damage over time effects and card death
        effectsHandler(playerEffects, setPlayerEffects, setPlayerCards, setMonsterCards, round)
        effectsHandler(opponentEffects, setOpponentEffects, setMonsterCards, setPlayerCards, round)
        checkCardDeath(setPlayerCards)
        checkCardDeath(setMonsterCards)
        // eslint-disable-next-line
    }, [round])

    useEffect(() => {
        if (round !== 1) {
            skillChargeUpdateAtRoundEnd(setMonsterCards, round)
            skillChargeUpdateAtRoundEnd(setPlayerCards, round)
        }
    }, [round])

    useEffect(() => {
        if (turn === 0) {
            const nonStunedCards = playerCards.filter(card => 
                (round - card?.stunRound >= card?.stunLength || !card?.stunRound)
            )
            if (!nonStunedCards.length) {
                setTurn(1)
            }
        }
        // eslint-disable-next-line
    }, [turn])

    useEffect(() => {
        const { mode, turn, index } = sequence;

        if (mode && playerCards.length && monsterCards.length) {
            
            const monsterIndex = playerChoice(monsterCards) //rename monster to attack
            
            const attacker = turn === 0 ? playerCards[index] : monsterCards[index] 
            const receiver = turn === 0 ? monsterCards[monsterIndex] : playerCards[playerToAttack] 

            switch(mode) {
                case "normalAttack": {
                    let damage = damageValue(attacker, receiver)
                    let damageTaken = handleHp(receiver?.hp - damage.value);

                    (async () => {
                        setInSequence(true)

                        turn === 0 
                            ? setPlayerAnimation({ state: true, id: attacker?.id, name: "atk-animation" })
                            : setOpponentAnimation({ state: true, id: attacker?.id, name: "atk-animation"})
                        // 300
                        await delay(300);

                        soundEffects.attack.play()
                        // 400
                        await delay(300);
            
                        turn === 0 
                            ? setPlayerAnimation({ state: false, id: 0, name: ""})
                            : setOpponentAnimation({ state: false, id: 0, name: ""})
                        //500
                        await delay(400);

                        turn === 0 
                            ? setOpponentAnimation({ state: true, id: receiver?.id, name: "dmg-take"})
                            : setPlayerAnimation({ state: true, id: receiver?.id, name: "dmg-take"})
                        
                        soundEffects.dmgTake.play()
                        //500
                        await delay(400);

                        turn === 0 
                            ? setOpponentAnimation({ state: false, id: 0, name: ""})
                            : setPlayerAnimation({ state: false, id: 0, name: ""})

                        turn === 0
                            ? setMonsterCards(cards => cards.map(card => {
                                if (card.id !== receiver.id) return card
                                    return {...card, action: {name: "onDamageReceived", type: damage.type, value: damage.value, attackType: damage.attackType}}
                            }))
                            : setPlayerCards(cards => cards.map(card => {
                                if (card.id !== receiver.id) return card
                                    return {...card, action: {name: "onDamageReceived", type: damage.type, value: damage.value, attackType: damage.attackType}}
                            }))
                        //1000
                        await delay(800);

                        turn === 0 
                            ? handleDamageReceived(setMonsterCards, receiver.id, damageTaken)  
                            : handleDamageReceived(setPlayerCards, receiver.id, damageTaken)
                        //2500
                        await delay(2000)

                        turn === 0
                            ? setMonsterCards(cards => cards.map(card => {
                                if (card.id !== receiver.id) return card
                                    return {...card, action: {name: "", type: damage.type, value: damage.value, attackType: damage.attackType}}
                            }))
                            : setPlayerCards(cards => cards.map(card => {
                                if (card.id !== receiver.id) return card
                                    return {...card, action: {name: "", type: damage.type, value: damage.value, attackType: damage.attackType}}
                            }))

                        turn === 1 
                            ? skillChargeUpdate(setMonsterCards, attacker)  
                            : skillChargeUpdate(setPlayerCards, attacker)
                        // soundEffects.activeSkillCharge.play()
                        //2000
                        await delay(500)

                        //card death check
                        turn === 1
                            ? checkCardDeath(setPlayerCards)
                            : checkCardDeath(setMonsterCards)
                        //1500
                        await delay(1000)
        
                        setRound(round => turn === 0 ? round : round + 1)

                        // console.log(round)

                        setTurn(turn === 0 ? 1 : 0)
                        setInSequence(false)
                    })()
                    }
                    break;
                case "activeSkill": 

                    (async() => {
                        setInSequence(true);
                        // console.log(`${attacker?.name} is the attacker, ${receiver?.name} is the reciever`)
                        //300
                        await delay(200)

                        turn === 1
                            ? updateSkillCharge(setMonsterCards, attacker, 2)
                            : updateSkillCharge(setPlayerCards, attacker, 2)
                        soundEffects.activeSkillPop.play()
                        //800
                        await delay(700)

                        turn === 1
                        ? updateSkillCharge(setMonsterCards, attacker, 1)
                        : updateSkillCharge(setPlayerCards, attacker, 1)
                        soundEffects.activeSkillPop.play()
                        //800
                        await delay(700)

                        turn === 1
                            ? updateSkillCharge(setMonsterCards, attacker, 0)
                            : updateSkillCharge(setPlayerCards, attacker, 0)
                        soundEffects.activeSkillPop.play()
                        //800
                        await delay(700)
                        
                        turn === 0 
                            ? setPlayerAnimation({ state: true, id: attacker?.id, name: "skill-animation" })
                            : setOpponentAnimation({ state: true, id: attacker?.id, name: "skill-animation" })
                        //5000
                        await delay(4000);

                        turn === 0 
                            ? activeSkills(setPlayerCards, setMonsterCards, playerCards, monsterCards, attacker, receiver, round, setPlayerEffects, setOpponentEffects)
                            : activeSkillBoss(setPlayerCards, setMonsterCards, playerCards, monsterCards, attacker, receiver, round, setOpponentEffects, setPlayerEffects)
                        //700
                        await delay(1000);
                        
                        turn === 0 
                            ? setPlayerAnimation({ state: false, id: 0, name: "" })
                            : setOpponentAnimation({ state: false, id: 0, name: "" })


                        //5000
                        await delay(2000)

                        //card death check
                        checkCardDeath(setPlayerCards)
                        checkCardDeath(setMonsterCards)                        

                        setRound(round => turn === 0 ? round : round + 1)
                        //1500
                        await delay(1000)
                        setTurn(turn === 0 ? 1 : 0)
                        setInSequence(false)
                    })()
                    break;
                default:
                    break;
            }
        }
        // eslint-disable-next-line
    }, [sequence])
    
    return {
        turn,
        inSequence,
        monsterCards,
        playerCards,
        playerAnimation,
        opponentAnimation,
        round,
        setSequence,
        sequence,
    }
}