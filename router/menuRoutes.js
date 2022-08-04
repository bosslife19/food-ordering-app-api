const router = require('express').Router();
const Menu = require('../Models/Menu')



// Post new Menu
router.post('/', async(req, res)=>{
try{
    const menu = await Menu.create(req.body)
    res.status(201).json(menu);
}
catch(err){
        res.status(500).json('error occured in the server')
    }
    
})
// Get all Menus on display
router.get('/', async (req, res)=>{
    try{
        
        
        const menus = await Menu.find()
    if(menus === ""){
        res.status(200).json('Menu not Updated yet')
    }else{
        
        res.status(200).json(menus)

    }
    }
    catch(err){
        res.status(500).json('an error occured in the server')
        
    }
})

// get single menu
router.get('/:id', async (req, res)=>{
 try{
    const menu = await Menu.findById(req.params.id);
    res.status(200).json(menu)
 }
 catch(err){
    res.status(500).json(error)
 }
})

// delete a menu
router.delete('/:id', async(req, res)=>{
    try{
        const menu = await Menu.findById(req.params.id);
    await menu.delete();
    res.status(200).json(menu)
    }
    catch(err){
        res.status(500).json(err)
    }
    
})

// update a menu
router.put('/:id', async (req, res)=>{
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(menu)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;