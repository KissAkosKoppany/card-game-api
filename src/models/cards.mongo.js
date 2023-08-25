const mongoose = require('mongoose')

const cardsSchema = new mongoose.Schema({
    id: String,
    name: String,
    attack: Number,
    hp: Number,
    maxHp: Number,
    armor: Number,
    magicResist: Number,
    critRate: Number,
    critDamage: Number,
    image: String,
    video: String,
    skill: [ String ],
    skillCount: Number,
    skillCharge: Number,
    theme: String,
    damageType: String,
    stance: String
})

module.exports = mongoose.model('Card', cardsSchema)