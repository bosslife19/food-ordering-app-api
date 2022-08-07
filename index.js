const mongoose = require('mongoose')
const express = require('express')

// const multer = require('multer')
const app = express();



const menuRoutes = require('./router/menuRoutes')
const OrderRoutes = require('./router/OrderRoutes')
const AdminRoutes = require('./router/AdminRoutes')
const path = require('path')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
dotenv.config();

mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost:27017/Food-App')

.then(app.listen(process.env.PORT || 4000, console.log('server started')))




app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/build')))







// const storage = multer.diskStorage({
//     destination: 'images',
//     filename: function(req, file, cb){
//         cb(null, req.body.name)
//     }
// })

// const upload = multer({storage: storage});
// app.post('/api/upload', upload.single('file'), (req, res)=>{
//     res.status(201).json("image uploaded")
// })

app.use('/api/admin/', AdminRoutes)
app.use('/api/menu/', menuRoutes )
app.use('/api/order/', OrderRoutes)

app.get('/api/key/', (req, res)=>{
    try {
        res.status(200).json(process.env.PAYSTACK_KEY)
    } catch (error) {
        res.status(500).json(error)
    }
})
app.use('/api/mail/', (req, res)=>{
    const {email, name} = req.body
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        secure: false,
       
        auth:{
            
            user: 'wokodavid001@gmail.com',
            pass: process.env.GOOGLE_PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    
      
    const options = {
        from: "wokodavid001@gmail.com",
        
        to: `${email}`,
        subject: 'ORDER NOTIFICATION FROM WOKS-CATERING',
        text: `Dear ${name}, We Have received your Meal order and will be at your doorstep within the hour
        Thanks for doing business with us, it is a pleasure!`
    }
    transport.verify((error, success) => {
        if(error){
            console.log(error)
        }
    })
    transport.sendMail(options,function (err, info){
        if(err){
            console.log(err)
        }
        else{
            
            res.status(200).json('message sent')

        }
    })
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/build/index.html'))
})






