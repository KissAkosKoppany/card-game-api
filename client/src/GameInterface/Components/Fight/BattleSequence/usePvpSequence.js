import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { delay, playerChoice } from "./helpers"
import { soundEffects } from "../../../../SoundEffects/soundEffects"
import { damageValue, handleHp, handleDamageReceived, skillChargeUpdate, skillChargeUpdateAtRoundEnd, handleNormalAttack, checkCardDeath, updateSkillCharge } from "../BattleFunctions/battleFunctionHelpers"
import { activeSkills } from "../BattleFunctions/activeSkills"
import { effectsHandler } from "../BattleFunctions/effectsHandler"
import { useBattleEndHandlerPvP } from "./useBattleEndHandler"

export const usePvpSequence = (room, socket, isReferee, setBattleMode, userId, pvpPoints) => {

    const playerBattleCards = useSelector((state) => state.rootReducer.cards.playerBattleCards)
    const opponentBattleCards = useSelector((state) => state.rootReducer.cards.opponentBattleCards)

    const [sequence, setSequence] = useState({})
    const [turn, setTurn] = useState(0)
    const [inSequence, setInSequence] = useState(false)
    const [opponentCards, setOpponentCards] = useState(opponentBattleCards)
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

    useBattleEndHandlerPvP(playerCards, opponentCards, isReferee, userId, pvpPoints, setBattleMode)

    useEffect(() => {
        //checks for crowd control and damage over time effects and card death
        if(isReferee) {
            effectsHandler(playerEffects, setPlayerEffects, setPlayerCards, setOpponentCards, round)
            effectsHandler(opponentEffects, setOpponentEffects, setOpponentCards, setPlayerCards, round)
            socket.emit('handleEffects', playerEffects, opponentEffects, round, room)
            //card death check
            checkCardDeath(setPlayerCards)
            checkCardDeath(setOpponentCards)
            socket.emit('cardDeathPlayer', room)
            socket.emit('cardDeathOpponent', room)
        }
        // eslint-disable-next-line
    }, [round, isReferee])

    useEffect(() => {
        if (isReferee) {
            if (round !== 1) {
                skillChargeUpdateAtRoundEnd(setOpponentCards, round)
                skillChargeUpdateAtRoundEnd(setPlayerCards, round)
                socket.emit('skillChargeUpdateAtRoundEnd', round, room)
            }
        }
    }, [round, isReferee])

    useEffect(() => {
        if(isReferee) {
            socket.emit('round', round, room)
            if (turn === 0) {
                const nonStunedCards = playerCards.filter(card => 
                    (round - card?.stunRound >= card?.stunLength || !card?.stunRound)
                )
                if (!nonStunedCards.length) {
                    setTurn(1)
                    console.log("everyone is stunned")
                }
            } else {
                const nonStunedCards = opponentCards.filter(card => 
                    (round - card?.stunRound >= card?.stunLength || !card?.stunRound)
                )
                if (!nonStunedCards.length) {
                    setTurn(0)
                    console.log("everyone is stunned")
                }
            }
        }
        // eslint-disable-next-line
    }, [turn])

    useEffect(() => {
        if(isReferee) {

            const { mode, turn, index } = sequence;
    
            if (mode && playerCards.length && opponentCards.length) {
                
                const recieverIndex = playerChoice(opponentCards) //rename monster to attack
                const recieverIndexPlayer = playerChoice(playerCards)
                
                const attacker = turn === 0 ? playerCards[index] : opponentCards[index] 
                const receiver = turn === 0 ? opponentCards[recieverIndex] : playerCards[recieverIndexPlayer] 
    
                switch(mode) {
                    case "normalAttack": {
                        let damage = damageValue(attacker, receiver)
                        // console.log(damage, "naaaaa")
                        let damageTaken = handleHp(receiver?.hp - damage.value);
    
                        (async () => {
                            setInSequence(true)
                            socket.emit('setInSequence', true, room)
                            // console.log(`${attacker?.name} is the attacker, ${receiver?.name} is the reciever`)
    
                            turn === 0
                                ? setPlayerAnimation({ state: true, id: attacker?.id, name: "atk-animation" })
                                : setOpponentAnimation({ state: true, id: attacker?.id, name: "atk-animation" })

                            socket.emit('animation', { state: true, id: attacker?.id, name: "atk-animation" }, turn, room)
                            
                            await delay(300);
    
                            soundEffects.attack.play()
                            socket.emit('attackSoundEffect', (room))
                            await delay(300);
                
                            turn === 0 
                                ? setPlayerAnimation({ state: false, id: 0, name: "" })
                                : setOpponentAnimation({ state: false, id: 0, name: "" })
                            
                            socket.emit('animation', { state: false, id: 0, name: "" }, turn, room)

                            await delay(400);
    
                            turn === 0 
                                ? setOpponentAnimation({ state: true, id: receiver?.id, name: "dmg-take"})
                                : setPlayerAnimation({ state: true, id: receiver?.id, name: "dmg-take"})
                            
                            socket.emit('animation', { state: true, id: receiver?.id, name: "dmg-take"}, 1-turn, room)
                            
                            soundEffects.dmgTake.play()
                            socket.emit('dmgTakeSoundEffect', (room))
                            await delay(400);
    
                            turn === 0 
                                ? setOpponentAnimation({ state: false, id: 0, name: ""})
                                : setPlayerAnimation({ state: false, id: 0, name: ""})
                            
                            socket.emit('animation', { state: false, id: 0, name: ""}, 1-turn, room)
    
                            turn === 0
                                ? handleNormalAttack(setOpponentCards, receiver.id, "onDamageReceived", damage)
                                : handleNormalAttack(setPlayerCards, receiver.id, "onDamageReceived", damage)

                            socket.emit('normalAttack', receiver.id, 'onDamageReceived', damage, turn, room)
    
                            await delay(800);
    
                            turn === 0 
                                ? handleDamageReceived(setOpponentCards, receiver.id, damageTaken)  
                                : handleDamageReceived(setPlayerCards, receiver.id, damageTaken)

                            socket.emit('damageReceived', receiver.id, damageTaken, turn, room)
    
                            await delay(2000)
    
                            turn === 0           
                                ? handleNormalAttack(setOpponentCards, receiver.id, "", damage)
                                : handleNormalAttack(setPlayerCards, receiver.id, "", damage)

                            socket.emit('normalAttack', receiver.id, "", damage, turn, room)
    
                            turn === 1 
                                ? skillChargeUpdate(setOpponentCards, attacker)  
                                : skillChargeUpdate(setPlayerCards, attacker)

                            socket.emit('skillChargeUpdate', attacker, turn, room)
    
                            await delay(500)
    
                            //card death check
                            turn === 1
                                ? checkCardDeath(setPlayerCards)
                                : checkCardDeath(setOpponentCards)

                            socket.emit('cardDeathCheck', turn, room)
    
                            await delay(1000)
            
                            setRound(round => turn === 0 ? round : round + 1)
                            socket.emit('round', round, room)
    
                            // console.log(round)
    
                            setTurn(turn === 0 ? 1 : 0)
                            socket.emit('changeTurn', turn, room)
                            setInSequence(false)
                            socket.emit('setInSequence', false, room)
                        })()
                        }
                        break;
                    case "activeSkill": 
    
                        (async() => {
                            setInSequence(true);
                            socket.emit('setInSequence', true, room)
                            // console.log(`${attacker?.name} is the attacker, ${receiver?.name} is the reciever`)
    
                            await delay(200)
    
                            turn === 1 
                                ? updateSkillCharge(setOpponentCards, attacker, 2)
                                : updateSkillCharge(setPlayerCards, attacker, 2)
                            soundEffects.activeSkillPop.play()

                            socket.emit('updateSkillChargeActive', attacker, 2, turn, room)
    
                            await delay(600)
    
                            turn === 1 
                                ? updateSkillCharge(setOpponentCards, attacker, 1)  
                                : updateSkillCharge(setPlayerCards, attacker, 1)
                            soundEffects.activeSkillPop.play()

                            socket.emit('updateSkillChargeActive', attacker, 1, turn, room)
    
                            await delay(600)
    
                            turn === 1 
                                ? updateSkillCharge(setOpponentCards, attacker, 0) 
                                : updateSkillCharge(setPlayerCards, attacker, 0)
                            soundEffects.activeSkillPop.play()

                            socket.emit('updateSkillChargeActive', attacker, 0, turn, room)
    
                            await delay(500)
                            
                            turn === 0 
                                ? setPlayerAnimation({ state: true, id: attacker?.id, name: "skill-animation" })
                                : setOpponentAnimation({ state: true, id: attacker?.id, name: "skill-animation" })

                            socket.emit('animation', { state: true, id: attacker?.id, name: "skill-animation" }, turn, room)
                            await delay(4000);
    
                            turn === 0 
                                ? activeSkills(setPlayerCards, setOpponentCards, playerCards, opponentCards, attacker, receiver, round, setPlayerEffects, setOpponentEffects)
                                : activeSkills(setOpponentCards, setPlayerCards, opponentCards, playerCards, attacker, receiver, round, setOpponentEffects, setPlayerEffects)
    
                            socket.emit('activeSkill', playerCards, opponentCards, attacker, receiver, round, turn, room)
                            await delay(1000);
                            
                            turn === 0 
                                ? setPlayerAnimation({ state: false, id: 0, name: "" })
                                : setOpponentAnimation({ state: false, id: 0, name: "" })
                            
                            socket.emit('animation', { state: false, id: 0, name: "" }, turn, room)
    
                            await delay(2000)
    
                            //card death check
                            checkCardDeath(setPlayerCards)
                            checkCardDeath(setOpponentCards)
                            socket.emit('cardDeathCheck', 0, room)
                            socket.emit('cardDeathCheck', 1, room)
    
                            setRound(round => turn === 0 ? round : round + 1)
                            socket.emit('round', round, room)
                            await delay(1000)
                            setTurn(turn === 0 ? 1 : 0)
                            socket.emit('changeTurn', turn, room)
                            setInSequence(false)
                            socket.emit('setInSequence', false, room)
                        })()
                        break;
                    default:
                        break;
                }
            }
        }
        // eslint-disable-next-line
    }, [sequence])

    useEffect(() => {
        socket.on('setSequence', (turn, mode, index) => {
            setSequence({turn, mode, index})
          })

        socket.on('updateInSequence', inSequence => {
            setInSequence(inSequence)
        })

        socket.on('setAnimation', (attackAnimation, turn) => {
            turn === 0
                ? setPlayerAnimation(attackAnimation)
                : setOpponentAnimation(attackAnimation)
        })

        socket.on('playAttackSoundEffect', () => {
            soundEffects.attack.play()
        })

        socket.on('playDmgTakeSoundEffect', () => {
            soundEffects.dmgTake.play()
        })

        socket.on('setNormalAttack', (receiverId, actionName, damage, turn) => {
            turn === 0
                ? handleNormalAttack(setOpponentCards, receiverId, actionName, damage)
                : handleNormalAttack(setPlayerCards, receiverId, actionName, damage)
            
        })

        socket.on('setDamageReceived', (receiverId, damageTaken, turn) => {
            turn === 0
                ? handleDamageReceived(setOpponentCards, receiverId, damageTaken)
                : handleDamageReceived(setPlayerCards, receiverId, damageTaken)
        })

        socket.on('setSkillChargeUpdate', (attacker, turn) => {
            turn === 1
                ? skillChargeUpdate(setOpponentCards, attacker)
                : skillChargeUpdate(setPlayerCards, attacker)
            
        })

        socket.on('checkCardDeath', (turn) => {
            turn === 1
                ? checkCardDeath(setPlayerCards)
                : checkCardDeath(setOpponentCards)
        })

        socket.on('updateRound', round => {
            setRound(turn === 0 ? round : round + 1)
        })

        socket.on('updateTurn', turn => {
            setTurn(turn === 0 ? 1 : 0)
        })

        socket.on('updateSkillChargeAll', round => {
            skillChargeUpdateAtRoundEnd(setPlayerCards, round)
            skillChargeUpdateAtRoundEnd(setOpponentCards, round)
        })

        socket.on('updateSkillChargeActive', (attacker, value, turn) => {
            turn === 1
                ? updateSkillCharge(setOpponentCards, attacker, value)
                : updateSkillCharge(setPlayerCards, attacker, value)
            soundEffects.activeSkillPop.play()
        })

        socket.on('handleActiveSkill', (playerCards, opponentCards, attacker, receiver, round, turn) => {
            turn === 0 
                ? activeSkills(setPlayerCards, setOpponentCards, playerCards, opponentCards, attacker, receiver, round, setPlayerEffects, setOpponentEffects)
                : activeSkills(setOpponentCards, setPlayerCards, opponentCards, playerCards, attacker, receiver, round, setOpponentEffects, setPlayerEffects) 
        })

        socket.on('setEffects', (playerEffects, opponentEffects, round) => {
            effectsHandler(playerEffects, setPlayerEffects, setPlayerCards, setOpponentCards, round)
            effectsHandler(opponentEffects, setOpponentEffects, setOpponentCards, setPlayerCards, round)
        })

    }, [socket])

    return {
        turn,
        inSequence,
        sequence,
        opponentCards,
        playerCards,
        playerAnimation,
        opponentAnimation,
        round,
        setSequence,
        sequence,
    }
}