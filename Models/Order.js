const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({

        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            
        },
        dish:{
            type: String,
            
        },
        price:{
            type: String,
            
        },
        payment:{
            type: String,
            required: true
        }
    }, {timestamps: true})

    const Order = mongoose.model('order', OrderSchema)
    module.exports = Order;
            
            
