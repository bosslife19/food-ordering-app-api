const mongoose = require('mongoose')
const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    
    
}, {timestamps: true})

const Menu = mongoose.model('menu', MenuSchema)
module.exports = Menu;