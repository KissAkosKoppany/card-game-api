import { soundEffects } from "../../../../SoundEffects/soundEffects"
import { delay } from "../BattleSequence/helpers"
import { damageValue, handleHeal, handleHp, magicDamage, trueDamage } from "./battleFunctionHelpers"

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
        case "Beast Titan":
            (async() => {
                soundEffects.dmgTake.play()
                setPlayerCards(cards => cards.map(card => {
                    const damage = trueDamage(attacker);
                    const hpAfterHit = handleHp(card.hp - (damage.value * 2));
                    return {...card, hp: hpAfterHit, action: {name: "onDamageReceived", type: damage.type, value: 2 * damage.value, animation: "dmg-take", attackType: damage.attackType}}
                }))
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Titan One":
            setPlayerCards(cards => cards.map(card => {
                return {...card, titanFear: true}
            }))
            setBuffs(buffs => {
                return {...buffs, titanOne: {
                    fearLength: 3,
                    fearRound: round
                }}
            })
            break;
        case "Titan Two":
            setPlayerCards(cards => cards.map(card => {
                return {...card, titanBleed: true}
            }))
            setBuffs(buffs => {
                return {...buffs, titanTwo: {
                    bleedLength: 3,
                    bleedRound: round
                }}
            })
            break;
        case "Ryuk":
            (async() => {
                soundEffects.dmgTake.play()
                setPlayerCards(cards => cards.map(card => {
                    if(card.id === receiver.id) {
                        const damage = magicDamage(attacker, receiver)
                        const hpAfterHit = handleHp(card.hp - (damage * 3))
                        return {...card, hp: hpAfterHit, ryukSilence: true, action: {name: "onDamageReceived", type: 'normalAttack', value: 2 * damage, animation: "dmg-take", attackType: 'ap'}}
                    } else {
                        return {...card, ryukSilence: true}
                    }
                }))
                setBuffs(buffs => {
                    return {...buffs, ryuk: {
                        silenceLength: 2,
                        silenceRound: round
                    }}
                })
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Yagami Light":
            (async() => {
                soundEffects.heal.play()
                setOpponentCards(cards => cards.map(card => {
                    if(card.name === "Ryuk") {
                        const hpAfterHeal = card.hp + 1000
                        const healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, action: {name: "onHealReceived", type: "heal", value: 1000}}
                    } else {
                        const hpAfterHeal = card.hp + 300
                        const healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, action: {name: "onHealReceived", type: "heal", value: 300}}
                    }
                }))
                await delay(3500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Misa Misa":
            setOpponentCards(cards => cards.map(card => {
                const attack = card.attack + 300;
                const critDamage = card.critDamage + 50;
                return {...card, misaBuff: true, attack: attack, critDamage: critDamage}
            }))
            setBuffs(buffs => {
                return {...buffs, misa: {
                    buffLength: 3,
                    buffRound: round
                }}
            })
            break;
        case "Acnologia":
            (async() => {
                soundEffects.dmgTake.play()
                setPlayerCards(cards => cards.map(card => {
                    if (card.id === receiver.id) {
                        const damage = magicDamage(attacker, receiver)
                        const hpAfterHit = handleHp(card.hp - (2 * damage))
                        return {...card, hp: hpAfterHit, stunLength: 3, stunRound: round, action: {name: "onDamageReceived", type: 'normalAttack', value: 2 * damage, animation: "dmg-take", attackType: 'ap'}}
                    } return card
                }))
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Zeref":
            setPlayerCards(cards => cards.map(card => {
                return {...card, zerefPoison: true}
            }))
            setBuffs(buffs => {
                return {...buffs, zeref: {
                    poisonLength: 3,
                    poisonRound: round
                }}
            })
            break;
        case "Ichiya":
            setOpponentCards(cards => cards.map(card => {
                const attack = card.attack + 500;
                return {...card, attack: attack, ichiyaBuff: true}
            }))
            setBuffs(buffs => {
                return {...buffs, ichiya: {
                    buffLength: 3,
                    buffRound: round
                }}
            })
            break;
        default:
            console.log("boss default active")
            break;
    } 
}