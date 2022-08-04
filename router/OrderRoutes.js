const router = require('express').Router();
const Order = require('../Models/Order')

// post new order

router.post('/', async(req, res) => {
    try{
        const order = await Order.create(req.body)
        res.status(201).json(order);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Get ORDERS
router.get('/', async(req, res) =>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json(err);
    }
} )

// Delete Order
router.delete('/:id', async (req, res)=>{
    try{
        const deleted = await Order.findById(req.params.id);
        await deleted.delete();
        
        res.status(200).json(deleted)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router