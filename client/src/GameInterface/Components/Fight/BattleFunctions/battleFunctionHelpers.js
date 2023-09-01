// armour and magic resist max value will be 450 what will equeal 90%
// adDamage = attack * (def/-500 + 1)
// critDamage = attack * (critDamage/100 + 1)
import { soundEffects } from "../../../../SoundEffects/soundEffects";


export const randomNumber = () => {
    return Math.floor(Math.random() * 100);
}

export const handleResistance = (resistance) => {
    if (resistance > 500) return 500
        else if (resistance < 0) return 0
            return resistance
}

export const handleCrit = (critValue) => {
    if (critValue < 0) return 0
        return critValue
}

export const physicalDamage = (attacker, receiver) => {
    let armor = handleResistance(receiver.armor)
    return Math.floor(attacker.attack * (armor / -500 + 1))
}

export const magicDamage = (attacker, receiver) => {
    let magicResist = handleResistance(receiver.magicResist)
    return Math.floor(attacker.attack * (magicResist / -500 + 1))
}

export const attackDamage = (attacker, receiver) => {
    if (attacker.damageType === "ad") return physicalDamage(attacker, receiver)
        return magicDamage(attacker, receiver)
}

export const critAttack = (attacker, receiver) => {
    let damage = attackDamage(attacker, receiver)
    return Math.floor(damage * (handleCrit(attacker.critDamage) / 100 + 1))
}

export const trueDamage = (attacker) => {
    let value = attacker.attack
    let type = "normalAttack"
    let attackType = attacker.damageType;
    
    return {
        value, type, attackType
    }
}

export const damageValue = (attacker, receiver) => {
    let random = randomNumber()
    let value;
    let type;
    let attackType;
    if (random < attacker.critRate) {
        value = critAttack(attacker, receiver)
        type = "critAttack";
    } else {
        value = attackDamage(attacker, receiver);
        type = "normalAttack";
        attackType = attacker.damageType;
    }
    return {
        value, type, attackType
    }
}

export const bleedDamage = (attack, receiver) => {
    let armor = handleResistance(receiver.armor)
    return Math.floor(attack * (armor / -500 + 1))
}

export const poisonDamage = (attack, receiver) => {
    let magicResist = handleResistance(receiver.magicResist)
    return Math.floor(attack * (magicResist / -500 + 1))
}

export const handleHp = (damageTaken) => {
    if(damageTaken < 0) return 0
        return damageTaken
}

export const handleHeal = (hpAfterHeal, maxHp) => {
    if (hpAfterHeal > maxHp) return maxHp
        return hpAfterHeal
}

export const handleDamageReceived = (setCards, receiverId, damageTaken) => {
    setCards(cards => cards.map(card => {
        if ( card.id === receiverId) return {...card, hp: damageTaken}
            return card
    }))
}

export const handleNormalAttack = (setCards, receiverId, actionName, damage) => {
    setCards(cards => cards.map(card => {
        if (card.id !== receiverId) return card
            return {...card, action: {name: actionName, type: damage.type, value: damage.value, attackType: damage.attackType}}
    }))
}

export const skillChargeUpdate = (setCards, attacker) => {
    let charge = attacker?.skillCharge;
    if (charge === attacker?.skillCount) return 
        setCards(cards => cards.map(card => {
            if ( card.id !== attacker?.id || card?.stance === "active" || card.Luffyfear === true ) return card
                soundEffects.activeSkillCharge.play()
                return {...card, skillCharge: charge + 1}
        }))
}

export const checkCardDeath = (setCards) => {
    setCards(cards => cards.filter(card => card.hp > 0))
}

export const skillChargeUpdateAtRoundEnd = (setCards, round) => {
    setCards(cards => cards.map(card => {
        if (card?.skillCharge === card?.skillCount || card?.stance === "active" || card.Luffyfear === true || round - card?.stunRound < card?.stunLength) return card
            else {
                let charge = card.skillCharge;
                return {...card, skillCharge: charge + 1}
            }
    }))
}

export const updateSkillCharge = (setCards, attacker, value) => {
    setCards(cards => cards.map(card => {
        if ( card.id === attacker.id) {
            return {...card, skillCharge: value}
        } return card
    }))
}