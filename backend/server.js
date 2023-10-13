require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const eventRoutes = require('./routes/events.js')
const userRoutes = require('./routes/user.js')

const app = express()

//middleware - code that executes between req and res
/* next() - Middleware can call the next function to pass control to the next middleware in the chain or to 
the next route handler. This allows multiple middleware functions to sequentially process the request and response */
app.use((req,res,next)=>{   //global middleware
    console.log(req.path,req.method)
    next()
})

app.use(cors())

//routes
app.use(express.json()) // allows us to access the info in the body of the req

app.use('/api/events' ,eventRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for requests
    if(process.env.PORT)
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to DB & Server's Working on port "+process.env.PORT)
        })
}).catch((err)=>{
    console.log(err)
})

module.exports = app