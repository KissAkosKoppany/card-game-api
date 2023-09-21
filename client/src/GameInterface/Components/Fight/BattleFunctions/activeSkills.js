import { soundEffects } from "../../../../SoundEffects/soundEffects";
import { delay } from "../BattleSequence/helpers";
import { critAttack, handleHeal, handleHp, magicDamage, physicalDamage, resetAnimation, trueDamage } from "./battleFunctionHelpers";


export const activeSkills = (setPlayerCards, setOpponentCards, playerCards, opponentCards, attacker, receiver, round, setBuffs, setOpponentBuffs, turn, setShowFallenCards) => {
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
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return card
                        else {
                            let stunLength = turn === 0 ? 2 : 3;
                            console.log('stunlength', stunLength)
                            let damage = magicDamage(attacker, receiver)
                            let damageTaken = handleHp(card.hp - (damage * 4));
                            return {...card, hp: damageTaken, stunLength: stunLength, stunRound: round, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 4, animation: "dmg-take", attackType: 'ap'}}
                        } 
                }))
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
            break;
        case "Erwin Smith": {
            setBuffs(buffs => {
                return {...buffs, erwin: {
                    buffRound: round,
                    buffLength: 3
                }}
            })
            const highestAttackCard = playerCards.reduce((prev, current) => (prev.attack > current.attack) ? prev : current)
            let attackAfterBuff = highestAttackCard.attack + 400
            setPlayerCards(cards => 
                cards.map(card => {
                    if (card.id !== highestAttackCard.id) return card
                        return {...card, attack: attackAfterBuff, erwinBuff: true}
                })
            )
            }
            break;
        case "Gintoki":
            (async() => {
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
                            let critDamage = card.critDamage + 150
                            return {...card, image: "cardImg/gintokiActive.png", armor: armor, magicResist: magicResist, attack: attack, critRate: critRate, critDamage: critDamage, stance: "active", gintokiBuff: true}
                        }
                }))
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return card
                        else {
                            let damage = physicalDamage(attacker, receiver)
                            let damageTaken = handleHp(card.hp - (3.5 * damage));
                            return {...card, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: Math.floor(damage * 3.5), animation: "dmg-take", attackType: 'ad'}}
                        }
                }))
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
            break;
        case "Luffy":
            (async() => {
                setBuffs(buffs => {
                    let buffLength = turn === 0 ? 1 : 2;
                    return {...buffs, luffy: {
                        buffRound: round,
                        buffLength: buffLength
                    }}
                })
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return {...card, Luffyfear: true}
                        else {
                            let damage = physicalDamage(attacker, receiver)
                            let damageTaken = handleHp(card.hp - (damage * 5))
                            return {...card, hp: damageTaken, Luffyfear: true, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 5, animation: "dmg-take", attackType: 'ad'}}
                        }
                }))
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
            break;
        case "Megumin":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id === receiver.id) {
                        let damage = magicDamage(attacker, card);
                        let damageTaken = handleHp(card.hp - (damage * 5));
                        return {...card, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 5, animation: "dmg-take", attackType: 'ap'}}
                    } else {
                        let damage = magicDamage(attacker, card);
                        let damageTaken = handleHp(card.hp - (damage * 2));
                        return {...card, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 2, animation: "dmg-take", attackType: 'ap'}}
                    }
                }))
                await delay(3500)
                resetAnimation(setOpponentCards)
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
                        let hpAfterHeal = card.hp + 600;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, theme: "lightblue", image: "cardImg/asunaHealer.png", damageType: "ap", stance: "active", asunaHeal: true, action: {name: "onHealReceived", value: 600, type: "heal"}}
                    } else {
                        let hpAfterHeal = card.hp + 600;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, asunaHeal: true, action: {name: "onHealReceived", value: 600, type: "heal"}}
                    }
                }))
                setBuffs(buffs => {
                    return {buffs, asuna: {
                        buffRound: round,
                        buffLength: 3
                    }}
                })
                await delay(3500)
                resetAnimation(setPlayerCards)
            })()
            break;
        case "Kaneki Ken":
            (async() => {
                setPlayerCards(cards => cards.map(card => {
                    if (card.name !== "Kaneki Ken") return card
                        else {
                            let hpAfterHeal = card.hp + 400;
                            let healValue = handleHeal(hpAfterHeal, card.maxHp)
                            return {...card, hp: healValue, theme: "white", image: "cardImg/kanekiActive.png", stance: "active", kanekiBuff: true, action: {name: "onHealReceived", value: 400, type: "heal"}}
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
                        poisonLength: 4
                    }}
                })
                await delay(3500)
                resetAnimation(setPlayerCards)
            })()
            break;
        case "Orihime":
            (async() => {
                const lowestHpCard = playerCards.reduce((prev, current) => (prev.hp < current.hp) ? prev : current)
                setPlayerCards(cards => cards.map(card => {
                    if (card.id !== lowestHpCard.id) return card
                        else {
                            soundEffects.heal.play()
                            let hpAfterHeal = card.hp + 2400
                            let healValue = handleHeal(hpAfterHeal, card.maxHp)
                            let armor = card.armor + 500
                            let magicResist = card.magicResist + 500
                            return {...card, hp: healValue, armor: armor, magicResist: magicResist, orihimeBuff: true, action: {name: "onHealReceived", type: "heal", value: 2400}}
                        } 
                }))
                setBuffs(buffs => {
                    let buffLength = turn === 0 ? 2 : 3;
                    return {...buffs, orihime: {
                        buffLength: buffLength,
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
                    let hpAfterHit = handleHp(card.hp - (2.3 * damage))
                    return {...card, hp: hpAfterHit, action: {name: "onDamageReceived", type: 'normalAttack', value: Math.floor(2.3 * damage), animation: "dmg-take", attackType: 'ad'}}
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
                        let attack = card.attack - 250;
                        return {...card, attack: attack, critRate: critRate, critDamage: critDamage, sakamotoDeBuff: true}
                    }
            }))
            setBuffs(buffs => {
                let buffLength = turn === 0 ? 2 : 3;
                return {...buffs, sakamoto: {
                    buffLength: buffLength,
                    buffRound: round 
                }}
            })
            break;
        case "Haruhime":
            setPlayerCards(cards => cards.map(card => {
                let attack = card.attack + 200;
                let armor = card.armor + 100;
                let magicResist = card.magicResist + 100;
                return {...card, attack: attack, armor: armor, magicResist: magicResist, haruhimeAttack: true, haruhimeRes: true}
            }))
            setBuffs(buffs => {
                let buffLength = turn === 0 ? 2 : 3;
                return {...buffs, haruhimeRes: {
                    buffLength: buffLength,
                    buffRound: round
                }, harhimeAttack: {
                    buffLength: 3,
                    buffRound: round
                }}
            })
            break;
        case "Sakura":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if (card.id !== receiver.id) return {...card, sakuraSilence: true}
                        else {
                            let damage = physicalDamage(attacker, receiver)
                            let damageTaken = handleHp(card.hp - (damage * 6))
                            return {...card, hp: damageTaken, sakuraSilence: true, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 6, animation: "dmg-take", attackType: 'ad'}}
                        }
                }))
                setBuffs(buffs => {
                    let silenceLength = turn === 0 ? 1 : 2;
                    console.log("silencelength", silenceLength)
                    return {...buffs, sakura: {
                        silenceLength: silenceLength,
                        silenceRound: round
                    }}
                })
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
            break;
        case "Naofumi":
            setPlayerCards(cards => cards.map(card => {
                if(card.id !== attacker.id) {
                    let armor = card.armor + 150;
                    let magicResist = card.magicResist + 150;
                    return {...card, armor: armor, magicResist: magicResist, naofumiBuff: true}
                } return card
            }))
            setBuffs(buffs => {
                let buffLength = turn === 0 ? 2 : 3;
                return {...buffs, naofumi: {
                    buffLength: buffLength,
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
            (async() => {
                const lowestHpCard = playerCards.reduce((prev, current) => (prev.hp < current.hp) ? prev : current)
                setPlayerCards(cards => cards.map(card => {
                    if(card.id === lowestHpCard.id) {
                        soundEffects.heal.play()
                        let hpAfterHeal = card.hp + 800;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, action: {name: "onHealReceived", type: "heal", value: 800}, natsuBurn: false, Luffyfear: false, yunoBleed: false, sakuraSilence: false, kanekiPoison: false, saikenPoison: false, kuramaBurn: false, ryukSilence: false, titanFear: false, titanBleed: false, zerefPoison: false}
                    } else {
                        let hpAfterHeal = card.hp + 500;
                        let healValue = handleHeal(hpAfterHeal, card.maxHp)
                        return {...card, hp: healValue, action: {name: "onHealReceived", type: "heal", value: 500}, natsuBurn: false, Luffyfear: false, yunoBleed: false, sakuraSilence: false, kanekiPoison: false, saikenPoison: false, kuramaBurn: false, ryukSilence: false, titanFear: false, titanBleed: false, zerefPoison: false} 
                    }
                }))
                setOpponentBuffs(buffs => {
                    const {luffy, yuno, sakura, kanekiPoison, kurama, saiken, ryuk, titanOne, titanTwo, zeref, natsu, ...rest} = buffs;
                    return rest
                })
                await delay(3500)
                resetAnimation(setPlayerCards)
            })()
            break;
        case "Natsu":
            (async() => {
                soundEffects.dmgTake.play()
                const lowestHpCard = opponentCards.reduce((prev, current) => (prev.hp < current.hp) ? prev : current)
                setOpponentCards(cards => cards.map(card => {
                    if(card.id === lowestHpCard.id) {
                        let damage = magicDamage(attacker, lowestHpCard)
                        let damageTaken = handleHp(card.hp - (damage * 4))
                        return {...card, hp: damageTaken, natsuBurn: true, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 4, animation: "dmg-take", attackType: 'ap'}}
                    } else return card
                }))
                setBuffs(buffs => {
                    return {...buffs, natsu: {
                        burnLength: 3,
                        burnRound: round
                    }}
                })
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
            break;
        case "Asta":
            (async() => {
                soundEffects.dmgTake.play()
                setOpponentCards(cards => cards.map(card => {
                    if(card.id === receiver.id) {
                        let damage = physicalDamage(attacker, receiver)
                        let damageTaken = handleHp(card.hp - (damage * 5))
                        return {...card, skillCharge: 0, hp: damageTaken, action: {name: "onDamageReceived", type: 'normalAttack', value: damage * 5, animation: "dmg-take", attackType: 'ad'}}
                    } else {
                        let deBuffValue = turn === 0 ? 1 : 2;
                        let skillCharge = card.skillCharge === 0 ? 0 : card.skillCharge - deBuffValue;
                        return {...card, skillCharge: skillCharge}
                    }
                }))
                await delay(3500)
                resetAnimation(setOpponentCards)
            })()
        case "Orochimaru":
            setShowFallenCards(true)
            break;
        default:
            console.log("active default")
            break;
    }
}