import { soundEffects } from "../../../../SoundEffects/soundEffects";
import { delay } from "../BattleSequence/helpers";
import { critAttack, handleHeal, handleHp, magicDamage, physicalDamage, trueDamage } from "./battleFunctionHelpers";


export const activeSkills = (setPlayerCards, setOpponentCards, playerCards, opponentCards, attacker, receiver, round, setBuffs, setOpponentBuffs) => {
    switch(attacker.name) {
        case "Ayanokouji":
            setBuffs(buffs => {
                return {...buffs, ayanokouji: {
                    buffRound: round,
                    buffLength: 3
                }}
            })
            setPlayerCards(cards => cards.map(card => {
                let critRate = card.critRate + 20;
                let critDamage = card.critDamage + 100;
                return {...card, critRate: critRate, critDamage: critDamage, ayanokoujiBuff: true}
            }))
            break;
        case "Minato":
            setOpponentCards(cards => cards.map(card => {
                if (card.id === receiver.id) return {...card, stunLength: 3, stunRound: round}
                    return card
            }))
            break;
        case "Erwin Smith": {
            setBuffs(buffs => {
                return {...buffs, erwin: {
                    buffRound: round,
                    buffLength: 3
                }}
            })
            const highestAttackCard = playerCards.reduce((prev, current) => (prev.attack > current.attack) ? prev : current)
            let attackAfterBuff = highestAttackCard.attack + 300
            setPlayerCards(cards => 
                cards.map(card => {
                    if (card.id !== highestAttackCard.id) return card
                        return {...card, attack: attackAfterBuff, erwinBuff: true}
                })
            )
            }
            break;
        case "Gintoki":
            setBuffs(buffs => {
                return {...buffs, gintoki: {
                    buffRound: round,
                    buffLength: 4
                }}
            })
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Gintoki") return card
                    else {
                        let armor = card.armor - 100
                        let magicResist = card.magicResist - 100
                        let attack = card.attack + 400
                        let critRate = card.critRate + 60
                        let critDamage = card.critDamage + 100
                        return {...card, image: "cardImg/gintokiActive.png", armor: armor, magicResist: magicResist, attack: attack, critRate: critRate, critDamage: critDamage, stance: "active", gintokiBuff: true}
                    }
            }))
            break;
        case "Luffy":
            setBuffs(buffs => {
                return {...buffs, luffy: {
                    buffRound: round,
                    buffLength: 2
                }}
            })
            setOpponentCards(cards => cards.map(card => {
                return {...card, Luffyfear: true} 
            }))
            break;
        case "Megumin":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id === receiver.id) {
                        let damage = magicDamage(attacker, card);
                        let damageTaken = handleHp(card.hp - (damage * 3));
                        return {...card, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 3, animation: "dmg-take", attackType: 'ap'}}
                    } else {
                        let damage = magicDamage(attacker, card);
                        let damageTaken = handleHp(card.hp - damage);
                        return {...card, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: damage, animation: "dmg-take", attackType: 'ap'}}
                    }
                }))
                await delay(3500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Gasai Yuno":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return card
                        else {
                            let damage = critAttack(attacker, receiver)
                            let damageTaken = handleHp(card.hp - damage)
                            return {...card, hp: damageTaken, yunoBleed: true, action: {name: "onDamageReceived", type: "critAttack", value: damage, animation: "dmg-take"}}
                        }
                }))
                setBuffs(buffs => {
                    return {...buffs, yuno: {
                        bleedLength: 3,
                        bleedRound: round
                    }}
                })
                await delay(3500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Asuna":
            (async() => {
                soundEffects.heal.play()
                setPlayerCards(cards => cards.map(card => {
                    if (card.name === "Asuna") {
                        let hpAfterHeal = card.hp + 500;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, theme: "lightblue", image: "cardImg/asunaHealer.png", damageType: "ap", stance: "active", asunaHeal: true, action: {name: "onHealReceived", value: 500, type: "heal"}}
                    } else {
                        let hpAfterHeal = card.hp + 500;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, asunaHeal: true, action: {name: "onHealReceived", value: 500, type: "heal"}}
                    }
                }))
                setBuffs(buffs => {
                    return {buffs, asuna: {
                        buffRound: round,
                        buffLength: 3
                    }}
                })
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Kaneki Ken":
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Kaneki Ken") return card
                    else {
                        let attack = card.attack + 200;
                        let critRate = card.critRate + 50;
                        let critDamage = card.critDamage + 120;
                        return {...card, attack: attack, critRate: critRate, critDamage: critDamage, theme: "white", image: "cardImg/kanekiActive.png", stance: "active", kanekiBuff: true}
                    }
            }))
            setOpponentCards(cards => cards.map(card => {
                return {...card, kanekiPoison: true}
            }))
            setBuffs(buffs => {
                return {...buffs, kaneki: {
                    buffRound: round,
                    buffLength: 4
                }, kanekiPoison: {
                    poisonRound: round,
                    poisonLength: 3
                }}
            })
            break;
        case "Orihime":
            (async() => {
                const lowestHpCard = playerCards.reduce((prev, current) => (prev.hp < current.hp) ? prev : current)
                setPlayerCards(cards => cards.map(card => {
                    if (card.id !== lowestHpCard.id) return card
                        else {
                            soundEffects.heal.play()
                            let hpAfterHeal = card.hp + 1000
                            let healValue = handleHeal(hpAfterHeal, card.maxHp)
                            let armor = card.armor + 500
                            let magicResist = card.magicResist + 500
                            return {...card, hp: healValue, armor: armor, magicResist: magicResist, orihimeBuff: true, action: {name: "onHealReceived", type: "heal", value: 1000}}
                        } 
                }))
                setBuffs(buffs => {
                    return {...buffs, orihime: {
                        buffLength: 3,
                        buffRound: round
                    }}
                })
                await delay(3500)
                setPlayerCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Roronoa Zoro":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    let damage = physicalDamage(attacker, card)
                    let hpAfterHit = handleHp(card.hp - (2 * damage))
                    return {...card, hp: hpAfterHit, action: {name: "onDamageReceived", type: 'normalAttack', value: 2 * damage, animation: "dmg-take", attackType: 'ad'}}
                }))
                await delay(3500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Levi Ackerman":
            (async() => {
                soundEffects.dmgTake.play()
                const highestHpCard = opponentCards.reduce((prev, current) => (prev.maxHp > current.maxHp) ? prev : current)
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== highestHpCard.id) return card
                        else {
                            let damage = trueDamage(attacker)
                            let hpAfterHit = handleHp(card.hp - (4 * damage.value))
                            return {...card, hp: hpAfterHit, action: {name: "onDamageReceived", type: damage.type, value: 4 * damage.value, animation: "dmg-take", attackType: damage.attackType}}
                        }
                }))
                await delay(3500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {name: ""}}
                }))
            })()
            break;
        case "Sakamoto":
            const highestAttackCard = opponentCards.reduce((prev, current) => (prev.attack > current.attack) ? prev : current)
            setOpponentCards(cards => cards.map(card => {
                if (card.id !== highestAttackCard.id) return card
                    else {
                        let critRate = card.critRate - 50;
                        let critDamage = card.critDamage - 100;
                        return {...card, critRate: critRate, critDamage: critDamage, sakamotoDeBuff: true}
                    }
            }))
            setBuffs(buffs => {
                return {...buffs, sakamoto: {
                    buffLength: 3,
                    buffRound: round 
                }}
            })
            break;
        case "Haruhime":
            setPlayerCards(cards => cards.map(card => {
                let attack = card.attack + 200;
                let armor = card.armor + 100;
                let magicResist = card.magicResist + 100;
                return {...card, attack: attack, armor: armor, magicResist: magicResist, haruhimeBuff: true}
            }))
            setBuffs(buffs => {
                return {...buffs, haruhime: {
                    buffLength: 4,
                    buffRound: round
                }}
            })
            break;
        case "Sakura":
            setOpponentCards(cards => cards.map(card => {
                return {...card, sakuraSilence: true}
            }))
            setBuffs(buffs => {
                return {...buffs, sakura: {
                    silenceLength: 2,
                    silenceRound: round
                }}
            })
            break;
        case "Naofumi":
            setPlayerCards(cards => cards.map(card => {
                let armor = card.armor + 200;
                let magicResist = card.magicResist + 200;
                return {...card, armor: armor, magicResist: magicResist, naofumiBuff: true}
            }))
            setBuffs(buffs => {
                return {...buffs, naofumi: {
                    buffLength: 3,
                    buffRound: round
                }}
            })
            break;
        case "Natsuki Subaru":
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Natsuki Subaru") return card
                    return {...card, hp: 0}
            }))
            setOpponentCards(cards => cards.map(card => {
                let armor = card.armor - 1000;
                let magicResist = card.magicResist - 1000;
                return {...card, armor: armor, magicResist: magicResist, subaruDeBuff: true}
            }))
            setBuffs(buffs => {
                return {...buffs, subaru: {
                    deBuffLength: 4,
                    deBuffRound: round
                }}
            })
            break;
        case "Aqua":
            setPlayerCards(cards => cards.map(card => {
              return {...card, Luffyfear: false, yunoBleed: false, sakuraSilence: false, kanekiPoison: false, saikenPoison: false, kuramaBurn: false}  
            }))
            setOpponentBuffs(buffs => {
                const {luffy, yuno, sakura, kanekiPoison, kuramaBurnm, saikenPoison, ...rest} = buffs;
                return rest
            })
            break;
        default:
            console.log("active default")
            break;
    }
}