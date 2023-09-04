import { soundEffects } from "../../../../SoundEffects/soundEffects";
import { delay } from "../BattleSequence/helpers";
import { bleedDamage, handleHeal, handleHp, poisonDamage } from "./battleFunctionHelpers";

export const effectsHandler = async(buffs, setBuffs, setPlayerCards, setOpponentCards, round) => {

    if (buffs.ayanokouji) {
        if (round - buffs.ayanokouji.buffRound === buffs.ayanokouji.buffLength) {
            setBuffs(buffs => {
                const {ayanokouji, ...rest} = buffs;
                return rest
            })
            setPlayerCards(cards => cards.map(card => {
                let critRate = card.critRate - 100;
                let critDamage = card.critDamage - 100;
                return {...card, critRate: critRate, critDamage: critDamage, ayanokoujiBuff: false}
            }))
        }
    }

    if (buffs.erwin) {
        if (round - buffs.erwin.buffRound === buffs.erwin.buffLength) {
            setPlayerCards(cards => 
                cards.map(card => {
                    if (!card.erwinBuff) return card
                    else {
                        let attackAfterBuffRemoved = card.attack - 300 
                        return {...card, attack: attackAfterBuffRemoved, erwinBuff: false}
                    }
                })
            )
            setBuffs(buffs => {
                const {erwin, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.gintoki) {
        if (round - buffs.gintoki.buffRound === buffs.gintoki.buffLength) {
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Gintoki") return card
                    else {
                        let armor = card.armor + 100
                        let magicResist = card.magicResist + 100
                        let attack = card.attack - 400
                        let critRate = card.critRate - 60
                        let critDamage = card.critDamage - 100
                        return {...card, image: "cardImg/gintoki.png", armor: armor, magicResist: magicResist, attack: attack, critRate: critRate, critDamage: critDamage, stance: "normal", gintokiBuff: false}
                    }
            }))
            setBuffs(buffs => {
                const {gintoki, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.luffy) {
        //fearlenght rename
        if (round - buffs.luffy.buffRound === buffs.luffy.buffLength) {
            setOpponentCards(cards => cards.map(card => {
                if (!card.Luffyfear) return card
                    return {...card, Luffyfear: false}
                
            }))
            setBuffs(buffs => {
                const {luffy, ...rest} = buffs;
                return rest
            })
        }
    }
    
    if (buffs.yuno) {
        if (round - buffs.yuno.bleedRound < buffs.yuno.bleedLength) {
            if(round !== buffs.yuno.bleedRound) {      
                setOpponentCards(cards => cards.map(card => {
                    if (!card.yunoBleed) return card
                        else {
                            soundEffects.bleed.play()
                            let damage = bleedDamage(500, card);
                            let damageTaken = handleHp(card.hp - damage);
                            return {...card, hp: damageTaken, action: {animation: "bleed-dmg-take"}}
                        }
                }))
                await delay(1500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {animation: ""}}
                }))
            }
        } else {
            setOpponentCards(cards => cards.map(card => {
                if (!card.yunoBleed) return card
                    return {...card, yunoBleed: false}
            }))
            setBuffs(buffs => {
                const {yuno, ...rest} = buffs;
                return rest;
            })
        }
    }

    if (buffs.asuna) {
        if (round - buffs.asuna.buffRound < buffs.asuna.buffLength) {
            if(round !== buffs.asuna.buffRound) {
                console.log("heal")
                setPlayerCards(cards => cards.map(card => {
                    soundEffects.heal.play()
                    let hpAfterHeal = card.hp + 300;
                    let healValue = handleHeal(hpAfterHeal, card.maxHp)
                    return {...card, hp: healValue}
                }))
            }
        } else {
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Asuna") return {...card, asunaHeal: false}
                    return {...card, theme: "white", type: "ad", image: "cardImg/asuna.png", stance: "normal", asunaHeal: false}
            }))
            setBuffs(buffs => {
                const {asuna, ...rest} = buffs;
                return rest;
            })
        }
    }

    if (buffs.kanekiPoison) {
        if (round - buffs.kanekiPoison.poisonRound < buffs.kanekiPoison.poisonLength) {
            if(round !== buffs.kanekiPoison.poisonRound) {
                setOpponentCards(cards => cards.map(card => {
                    soundEffects.poison.play()
                    let damage = poisonDamage(800, card)
                    let hpAfterPoisonHit = handleHp(card.hp - damage)
                    return {...card, hp: hpAfterPoisonHit, action: {animation: "poison-dmg-take"}}
                }))
                await delay(1500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {animation: ""}}
                }))
            }
        } else {
                setOpponentCards(cards => cards.map(card => {
                    return {...card, kanekiPoison: false}
                }))
                setBuffs(buffs => {
                    const {kanekiPoison, ...rest} = buffs;
                    return rest
                })
                
        }
    }

    if (buffs.kaneki) {
        if (round - buffs.kaneki.buffRound === buffs.kaneki.buffLength) {
            setPlayerCards(cards => cards.map(card=> {
                if (card.name !== "Kaneki Ken") return card
                    else {
                        let attackAfterBuff = card.attack - 300;
                        let critRate = card.critRate - 50;
                        let critDamage = card.critDamage - 120;
                        return {...card, attack: attackAfterBuff, critRate: critRate, critDamage: critDamage, image: "cardImg/kaneki.png", theme: "black", stance: "normal", kanekiBuff: false}
                    }
            }))
            setBuffs(buffs => {
                const {kaneki, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.orihime) {
        if (round - buffs.orihime.buffRound === buffs.orihime.buffLength) {
            setPlayerCards(cards => cards.map(card=> {
                if (!card.orihimeBuff) return card
                    else {
                        let armor = card.armor - 500
                        let magicResist = card.magicResist - 500
                        return {...card, armor: armor, magicResist: magicResist, orihimeBuff: false}
                    }
            }))
            setBuffs(buffs => {
                const {orihime, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.sakamoto) {
        if (round - buffs.sakamoto.buffRound === buffs.sakamoto.buffLength) {
            setOpponentCards(cards => cards.map(card => {
                if (!card.sakamotoDeBuff) return card
                    else {
                        let critRate = card.critRate + 50
                        let critDamage = card.critDamage + 100
                        return {...card, critDamage: critDamage, critRate: critRate, sakamotoDeBuff: false}
                    }
            }))
            setBuffs(buffs => {
                const {sakamoto, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.haruhime) {
        if (round - buffs.haruhime.buffRound === buffs.haruhime.buffLength) {
            setPlayerCards(cards => cards.map(card => {
                let attack = card.attack - 200;
                let armor = card.armor - 100;
                let magicResist = card.magicResist - 100;
                return {...card, attack: attack, magicResist: magicResist, armor: armor, haruhimeBuff: false}
            }))
            setBuffs(buffs => {
                const {haruhime, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.sakura) {
        if (round - buffs.sakura.silenceRound === buffs.sakura.silenceLength) {
            setOpponentCards(cards => cards.map(card => {
                return {...card, sakuraSilence: false}
            }))
            setBuffs(buffs => {
                const {sakura, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.naofumi) {
        if (round - buffs.naofumi.buffRound === buffs.naofumi.buffLength) {
            setPlayerCards(cards => cards.map(card => {
                let armor = card.armor - 200;
                let magicResist = card.magicResist - 200;
                return {...card, armor: armor, magicResist: magicResist, naofumiBuff: false}
            }))
            setBuffs(buffs => {
                const {naofumi, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.subaru) {
        if (round - buffs.subaru.deBuffRound === buffs.subaru.deBuffLength) {
            setOpponentCards(cards => cards.map(card => {
                let armor = card.armor + 1000;
                let magicResist = card.magicResist + 1000;
                return {...card, armor: armor, magicResist: magicResist, subaruDeBuff: false}
            }))
            setBuffs(buffs => {
                const {subaru, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.kurama) {
        if (round - buffs.kurama.burnRound < buffs.kurama.burnLength) {
            if(round !== buffs.kurama.burnRound) {
                setOpponentCards(cards => cards.map(card => {
                    soundEffects.burn.play()
                    let burnDamage = 200;
                    let hpAfterBurn = handleHp(card.hp - burnDamage);
                    return {...card, hp: hpAfterBurn, action: {animation: "burn-dmg-take"}}
                }))
                await delay(1500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {animation: ""}}
                }))
            }
        } else {
            setOpponentCards(cards => cards.map(card => {
                return {...card, kuramaBurn: false}
            }))
            setBuffs(buffs => {
                const {kurama, ...rest} = buffs;
                return rest
            })
        }
    }

    if (buffs.isobu) {
        if (round - buffs.isobu.deBuffRound === buffs.isobu.deBuffLength) {
            setOpponentCards(cards => cards.map(card => {
                if (!card.isobuDeBuff) return card
                    else {
                        let armor = card.armor + 150
                        let magicResist = card.magicResist + 150
                        return {...card, armor: armor, magicResist: magicResist, isobuDeBuff: false}
                    }
            }))
            setBuffs(buffs => {
                const {isobu, ...rest} = buffs
                return rest
            })
        }
    }

    if (buffs.saiken) {
        if (round - buffs.saiken.poisonRound < buffs.saiken.poisonLength) {
            if(round !== buffs.saiken.poisonRound) {
                setOpponentCards(cards => cards.map(card => {
                    soundEffects.poison.play()
                    let poisonDamage = 200;
                    let hpAfterPoison = handleHp(card.hp - poisonDamage);
                    return {...card, hp: hpAfterPoison, action: {animation: "poison-dmg-take"}}
                }))
                await delay(1500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {animation: ""}}
                }))
            }
        } else {
            setOpponentCards(cards => cards.map(card => {
                return {...card, saikenPoison: false}
            }))
            setBuffs(buffs => {
                const {saiken, ...rest} = buffs;
                return rest
            })
        }
    }
}