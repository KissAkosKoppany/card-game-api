import { soundEffects } from "../../../../SoundEffects/soundEffects"
import { delay } from "../BattleSequence/helpers"
import { damageValue, handleHp } from "./battleFunctionHelpers"

export const activeSkillBoss = (setPlayerCards, setOpponentCards, playerCards, opponentCards, attacker, receiver, round, setBuffs, setOpponentBuffs) => {
    switch (attacker.name) {
        case "Kurama":
            setPlayerCards(cards => cards.map(card => {
                return {...card, kuramaBurn: true}
            }))
            setBuffs(buffs => {
                return {...buffs, kurama: {
                    burnLength: 3,
                    burnRound: round
                }}
            })
            break;
        case "Isobu":
            (async() => {
                soundEffects.dmgTake.play()
                setPlayerCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return card
                        else {
                            let damage = damageValue(attacker, card)
                            let damageAfterHit = handleHp(card.hp - damage.value)
                            let armor = receiver.armor - 150
                            let magicResist = receiver.magicResist - 150
                            return {...card, hp: damageAfterHit, armor: armor, magicResist: magicResist, isobuDeBuff: true, action: {name: "onDamageReceived", type: damage.type, value: damage.value, animation: "dmg-take", attackType: damage.attackType}}
                        }
                }))
                setBuffs(buffs => {
                    return {...buffs, isobu: {
                        deBuffLength: 4,
                        deBuffRound: round
                    }}
                })
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return card
                        return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Saiken":
            setPlayerCards(cards => cards.map(card => {
                return {...card, saikenPoison: true}
            }))
            setBuffs(buffs => {
                return {...buffs, saiken: {
                    poisonLength: 3,
                    poisonRound: round
                }}
            })
            break;
        default:
            console.log("boss default active")
            break;
    }  
}