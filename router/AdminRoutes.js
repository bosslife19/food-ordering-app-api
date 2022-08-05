const router = require('express').Router()
const Admin = require('../Models/Admin')
const bcrypt = require('bcrypt')

router.post('/bosslife19/register', async(req, res)=>{
    try{
      const {password} = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        req.body.password = hashedPwd
        const user = await Admin.create(req.body)
        res.status(201).json(user)
    }

    catch(err){
        throw new Error('server problem')
    }
})

router.post('/login', async(req, res)=>{
    try {
        const {password, username} = req.body
        const user = await Admin.findOne({username})
        
        if(user){
            
            
            const passwordExists = await bcrypt.compare(password, user.password);
            
            if(!passwordExists){
                throw new Error('wrong credentials')
            }
            res.status(200).json(user);
        }
        else{
            throw new Error('wrong credentials')
        }
    } catch (error) {
       
        
        res.status(400).json({error: error.message})
    }
})

module.exports = router;