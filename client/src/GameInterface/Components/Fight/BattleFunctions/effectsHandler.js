import { soundEffects } from "../../../../SoundEffects/soundEffects";
import { delay } from "../BattleSequence/helpers";
import { bleedDamage, handleHeal, handleHp, poisonDamage } from "./battleFunctionHelpers";

export const effectsHandler = async(buffs, setBuffs, setPlayerCards, setOpponentCards, round) => {

    if (buffs.ayanokouji) {
        if (round - buffs.ayanokouji.buffRound === buffs.ayanokouji.buffLength) {
            console.log("ayano buff deleted")
            //delete the buff from the buffs object
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
            console.log("erwin buff deleted")

            setPlayerCards(cards => 
                cards.map(card => {
                    if (!card.erwinBuff) return card
                    else {
                        let attackAfterBuffRemoved = card.attack - 200 
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
            console.log("gintoki buff deleted")
            setPlayerCards(cards => cards.map(card => {
                if (card.name !== "Gintoki") return card
                    else {
                        let armor = card.armor + 50
                        let magicResist = card.magicResist + 50
                        let attack = card.attack - 150
                        let critRate = card.critRate - 80
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
        if (round - buffs.luffy.buffRound === buffs.luffy.buffLength) {
            console.log("luffy buff deleted")
            setOpponentCards(cards => cards.map(card => {
                if (card.Luffystun === false || card.Luffyfear === false) return card
                    return {...card, Luffystun: false, Luffyfear: false}
                
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
                            let damage = bleedDamage(300, card);
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
            console.log("delete yuno bleed")
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
                    let hpAfterHeal = card.hp + 200;
                    let healValue = handleHeal(hpAfterHeal, card.maxHp)
                    return {...card, hp: healValue}
                }))
            }
        } else {
            console.log("asuna buff delete")
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
                    let damage = poisonDamage(300, card)
                    let hpAfterPoisonHit = handleHp(card.hp - damage)
                    return {...card, hp: hpAfterPoisonHit, action: {animation: "poison-dmg-take"}}
                }))
                await delay(1500)
                setOpponentCards(cards => cards.map(card => {
                    return {...card, action: {animation: ""}}
                }))
            }
        } else {
                console.log("kaneki poison deleted")
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
            console.log("kaneki buff deleted")
            setPlayerCards(cards => cards.map(card=> {
                if (card.name !== "Kaneki Ken") return card
                    else {
                        let attackAfterBuff = card.attack - 100;
                        let critRate = card.critRate - 50;
                        let critDamage = card.critDamage - 60;
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
            console.log("orihime buff deleted")
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
            console.log("sakamoto buff deleted")
            setOpponentCards(cards => cards.map(card => {
                if (!card.sakamotoDeBuff) return card
                    else {
                        let critRate = card.critRate + 20
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
            console.log("haruhime buff deleted")
            setPlayerCards(cards => cards.map(card => {
                let attack = card.attack - 100;
                let armor = card.armor - 50;
                let magicResist = card.magicResist - 50;
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
            console.log("sakura silence deleted")
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
            console.log("naofumi buff deleted")
            setPlayerCards(cards => cards.map(card => {
                let armor = card.armor - 150;
                let magicResist = card.magicResist - 150;
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
            console.log("subaru debuff deleted")
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
            console.log("kurama burn delete")
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
            console.log("idobu debuff deleted")
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
            console.log("saiken poison delete")
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